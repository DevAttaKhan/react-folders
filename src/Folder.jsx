import React from "react";
import { ReactComponent as FolderIcon } from "./assets/folder-regular.svg";

const Folder = ({ folder, handler,active }) => {
  return (
    <div
      className="folder-box"
      onClick={(e) => {
        e.stopPropagation();
        handler(folder);
      }}
    >
      <p className={folder.childrens ? `folder parent ${active.includes(folder.id) ? 'parent-active' : ''}` : "folder"}>
        <FolderIcon /> {folder.name}
      </p>
      {folder.childrens && (
        <div className="sub">
          {folder.childrens.map((el) => (
            <Folder key={el.id} folder={el} handler={handler} active={active} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
