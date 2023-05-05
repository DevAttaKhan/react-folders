import React from "react";
import SideBar from "../componets/SideBar";
import BookList from "../componets/BookList";

const Home = () => {
  return (
    <>
      <main>
        <SideBar />
        <BookList />
      </main>
    </>
  );
};

export default Home;
