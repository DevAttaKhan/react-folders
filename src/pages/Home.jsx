import React from "react";
import SideBar from "../componets/SideBar/SideBar"; 
import MediaList from "../componets/MediaList/MediaList";

const Home = () => {
  return (
    <>
      <main>
        <SideBar />
        <MediaList />
      </main>
    </>
  );
};

export default Home;
