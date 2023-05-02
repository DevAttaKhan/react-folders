import React, { useState, useEffect } from "react";
import "./App.css";
import Folder from "./Folder";
import { ReactComponent as PlusIcon } from "./assets/plus-solid.svg";
import { ReactComponent as TrashIcon } from "./assets/trash-solid.svg";

function App() {
  const [openedFolders, setOpenedFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState("all");
  const [folders, setFolders] = useState([]);
  const [addBookInput, setAddBookInput] = useState(false);
  const [folderInput, setFolderInput] = useState(false);
  const [bookName, setBookName] = useState("");
  const [bookList, setBookList] = useState([]);
  const [newFolder, setNewFolder] = useState("");

  const getAllBooks = () => {
    fetch("http://localhost:3001/books")
      .then((res) => res.json())
      .then((data) => setBookList(data));
  };

  useEffect(() => {
    fetch("http://localhost:3001/folders")
      .then((res) => res.json())
      .then((data) => {
        setFolders(data);
      });

    getAllBooks();
  }, []);

  const folderClickHandler = (folder) => {
    if (folder.childrens) {
      if (openedFolders.includes(folder.folder_id)) {
        setOpenedFolders((p) => p.filter((e) => !["all", "uncategorized"].includes(e)).filter((e) => e !== folder.folder_id));
      } else
        setOpenedFolders((prev) => [
          ...prev.filter((e) => !["all", "uncategorized"].includes(e)),
          folder.folder_id,
        ]);
    }

    setActiveFolder(folder.folder_id);
  };

  const rootFolderClickHandler = (folder) => {
    setOpenedFolders((p) => [...p, folder.folder_id]);
    setActiveFolder(folder.folder_id);
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if(!bookName) return;

    fetch("http://localhost:3001/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookName,
        folderId: ["all", "uncategorized"].includes(activeFolder)
          ? null
          : activeFolder,
      }),
    })
      .then((res) => res.json())
      .then((data) => setBookList(data));
    setAddBookInput(false);
  };

  const OnCreateNewFolder = async () => {
    fetch("http://localhost:3001/folders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        folderName: newFolder,
        parentFolder: ["all", "uncategorized"].includes(activeFolder)
          ? null
          : activeFolder,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFolders(data);
        setNewFolder("");
        setFolderInput(false);
      });
  };

  const onDeleteFolder = async () => {
    if (["all", "uncategorized"].includes(activeFolder)) return;
    fetch(`http://localhost:3001/folders/${activeFolder}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        getAllBooks();
        setFolders(data);
      });
  };

  const renderBooks = (books, onDragStart) => {
    let content = [];
    if (activeFolder === "all") {
      content = books.map(({ book_id, book_name, folder_id }, i) => (
        <div
          className="book"
          key={book_id}
          draggable
          data-draggable-id={book_id}
          onDragStart={(e) => onDragStart(e, book_id)}
        >
          {book_name}
        </div>
      ));
    } else {
      content = books
        .filter((book) => book.folder_id === activeFolder)
        .map(({ book_id, book_name, folder_id }) => (
          <div
            className="book"
            key={book_id}
            draggable
            data-draggable-id={book_id}
            onDragStart={(e) => onDragStart(e, book_id)}
          >
            {book_name}
          </div>
        ));
    }
    return content;
  };
  async function readDirectory(directory) {
    var reader = directory.createReader();

    const entriesPromise = new Promise((resolve, reject) => {
      reader.readEntries((entries) => resolve(entries));
    });

    const entries = await entriesPromise;

    let entryPromises = [];

    entries.forEach((e) => {
      let p = new Promise((resolve, reject) => {
        resolve(e);
      });
      entryPromises.push(p);
    });

    const entryArr = await Promise.all([...entryPromises]);

    const filePromises = [];
    entryArr.forEach((entry) => {
      let p = new Promise((resolve, reject) => {
        entry.file((f) => resolve(f));
      });
      filePromises.push(p);
    });

    const files = await Promise.all([...filePromises]);

    return files;
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("sidebar")) {
      e.target.classList.add("s-drageover");
    } else if (e.target.classList.contains("folder")) {
      e.currentTarget.classList.remove("s-drageover");

      document
        .querySelectorAll(".folder")
        .forEach((el) => el.classList.remove("f-drageover"));

      e.target.closest(".folder").classList.add("f-drageover");
    }
  };

  const onDropHandler = async (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    document.querySelector(".sidebar").classList.remove("s-drageover");
    document
      .querySelectorAll(".folder")
      .forEach((el) => el.classList.remove("f-drageover"));

    if (["all", "uncategorized"].includes(e.target.dataset.folderid)) return;

    const folderId = Number(e.target.dataset.folderid);
    const bookId = data;

    fetch("http://localhost:3001/books/move", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId,
        folderId,
      }),
    })
      .then((res) => res.json())
      .then((data) => setBookList(data));
  };

  const onDragStart = (e, d) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(d));
  };

  const handleDrageLeave = (e) => {
    e.preventDefault();
    document.querySelector(".sidebar").classList.remove("s-drageover");
    document
      .querySelectorAll(".folder")
      .forEach((el) => el.classList.remove("f-drageover"));
  };

  return (
    <>
      <div className="App">
        <header>
          <h1>Book library</h1>
          {addBookInput && (
            <form onSubmit={handleBookSubmit}>
              <input
                type="text"
                placeholder="Enter Your Book Name"
                onChange={(e) => setBookName(e.target.value)}
                value={bookName}
              />
              <button type="submit">confirm</button>
            </form>
          )}
          {!addBookInput && (
            <button onClick={() => setAddBookInput(true)}>add book</button>
          )}
        </header>
        <main>
          <div
            className="sidebar"
            onDrop={onDropHandler}
            onDragOver={handleDragOver}
            onDragLeave={handleDrageLeave}
          >
            <div className="folder-actions">
              <button onClick={() => setFolderInput((p) => !p)}>
                <span>Create Folder</span> <PlusIcon />
              </button>
              <button onClick={onDeleteFolder}>
                <span>Delete Folder</span> <TrashIcon />
              </button>

              {folderInput && (
                <div className="creat-folder-input-wrapper">
                  <input
                    type="text"
                    placeholder="Enter Folder Name"
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value)}
                  />
                  <button onClick={OnCreateNewFolder}> Confirm </button>
                </div>
              )}
            </div>
            <Folder
              folder={{ folder_name: "All books", folder_id: "all" }}
              handler={rootFolderClickHandler}
              openedFolders={openedFolders}
              activeFolder={activeFolder}
            />
            {folders &&
              folders.map((folder) => (
                <Folder
                  openedFolders={openedFolders}
                  key={folder.folder_id}
                  folder={folder}
                  handler={folderClickHandler}
                  activeFolder={activeFolder}
                />
              ))}
          </div>

          <div className="book-list">
            {renderBooks(bookList).length ? (
              renderBooks(bookList, onDragStart)
            ) : (
              <h2>No Books Yet</h2>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
