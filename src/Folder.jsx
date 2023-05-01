import React from "react";
import { ReactComponent as FolderIcon } from "./assets/folder-regular.svg";
import { ReactComponent as FolderActiveIcon } from "./assets/folder-open.svg";

const Folder = ({ folder, handler,active }) => {
    
  return (
    <div
      className="folder-box"
      onClick={(e) => {
        e.stopPropagation();
        handler(folder);
      }}
      
    >
      <button className={folder.childrens ? `folder parent ${active.includes(folder.folder_id) ? 'parent-active' : ''}` : "folder"}>
        {active.includes(folder.folder_id) ? <FolderActiveIcon/> : <FolderIcon />} {folder.folder_name}
      </button>
      {folder.childrens && (
        <div className="sub">
          {folder.childrens.map((el) => (
            <Folder key={el.folder_id} folder={el} handler={handler} active={active} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
