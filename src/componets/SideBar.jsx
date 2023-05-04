import React, { useState, useEffect } from "react";
import Folder from "../Folder";
import { setActiveFolder } from "../store/uiSlice";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as PlusIcon } from "../assets/plus-solid.svg";
import { ReactComponent as TrashIcon } from "../assets/trash-solid.svg";
import { setFolderInput, setOpenedFolders } from "../store/uiSlice";

const SideBar = () => {
  const { activeFolder, folderInput, openedFolders } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();
  const [newFolder, setNewFolder] = useState("");

  const [folders, setFolders] = useState([]);
  //   const [openedFolders, setOpenedFolders] = useState([]);

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
      .then((data) => {
        console.log("hi");
        // setBookList(data)
      });
  };

  const folderClickHandler = (folder) => {
    if (folder.childrens) {
      if (openedFolders.includes(folder.folder_id)) {
        dispatch(
          setOpenedFolders({ type: "CLOSE_FOLDER", id: folder.folder_id })
        );
      } else
        dispatch(
          setOpenedFolders({ type: "OPEN_FOLDER", id: folder.folder_id })
        );
    }
    dispatch(setOpenedFolders({ type: "CLOSE_ROOT_FOLDER" }));
    dispatch(setActiveFolder(folder.folder_id));
  };

  const rootFolderClickHandler = (folder) => {
    dispatch(setOpenedFolders({ id: folder.folder_id, type: "ROOT_FOLDER" }));
    dispatch(setActiveFolder(folder.folder_id));
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
        dispatch(setFolderInput(false));
      });
  };

  const onDeleteFolder = async () => {
    if (["all", "uncategorized"].includes(setActiveFolder)) return;
    fetch(`http://localhost:3001/folders/${activeFolder}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // getAllBooks();
        setFolders(data);
      });
  };

  const handleDrageLeave = (e) => {
    e.preventDefault();
    document.querySelector(".sidebar").classList.remove("s-drageover");
    document
      .querySelectorAll(".folder")
      .forEach((el) => el.classList.remove("f-drageover"));
  };

  useEffect(() => {
    fetch("http://localhost:3001/folders")
      .then((res) => res.json())
      .then((data) => {
        setFolders(data);
      });
  }, []);

  return (
    <div
      className="sidebar"
      onDrop={onDropHandler}
      onDragOver={handleDragOver}
      onDragLeave={handleDrageLeave}
    >
      <div className="folder-actions">
        <button onClick={() => dispatch(setFolderInput())}>
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
  );
};

export default SideBar;
