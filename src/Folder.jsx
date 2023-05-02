import React from "react";
import { ReactComponent as FolderIcon } from "./assets/folder-regular.svg";
import { ReactComponent as FolderActiveIcon } from "./assets/folder-open.svg";

const Folder = ({ folder, handler,openedFolders, activeFolder }) => {
const isActive = folder.folder_id === activeFolder ? "folder-active" : ''
  return (
    <div
      className="folder-box"
      onClick={(e) => {
        e.stopPropagation();
        handler(folder);
      }}
      
    >
      <button className={folder.childrens ? `folder parent ${isActive} ${openedFolders.includes(folder.folder_id) ? 'parent-active' : ''}` : `folder ${isActive} `} data-folderid={folder.folder_id}>
        {openedFolders.includes(folder.folder_id) ? <FolderActiveIcon/> : <FolderIcon />} {folder.folder_name}
      </button>
      {folder.childrens && (
        <div className="sub">
          {folder.childrens.map((el) => (
            <Folder key={el.folder_id} folder={el} handler={handler} openedFolders={openedFolders} activeFolder={activeFolder}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
