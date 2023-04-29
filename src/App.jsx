import React, { useState } from "react";
import "./App.css";
import Folder from "./Folder";
import { folderList } from "./data";

function App() {
  const [openedFolders, setOpenedFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState("");

  const onClickHandler = (folder) => {
    if (folder.childrens) setOpenedFolders((prev) => [...prev, folder.id]);
    else{ setActiveFolder(folder.id)
    
    console.log(folder.id)}
  };
  return (
    <div className="App">
      <div className="container">
        {folderList.map((folder) => (
          <Folder
            active={openedFolders}
            key={folder.id}
            folder={folder}
            handler={onClickHandler}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
