import React, { useState } from "react";
// import { Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import Result from "./pages/Result";
import MyList from "./pages/MyList";
import NavBar from "./components/NavBar";
// import { Redirect } from "react-router-dom";
import BookContext from "./pages/book-context";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [input, setInput] = useState("");
  const [titleList, setTitleList] = useState([]);
  const [numOfResult, setNumOfResult] = useState();
  const [result, setResult] = useState(false);
  const [mylist, setMyList] = useState(JSON.parse(localStorage.getItem("myList")));
  const [sorted, setSorted] = useState(0);
  const [message, setMessage] = useState("");

  const [listToShow, setListToShow] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const addtoMyList = (element) => {
    console.log(titleList.indexOf(element));
    setMyList([...mylist, element]);
    localStorage.setItem("myList", JSON.stringify([...mylist, element]))
    let index = titleList.indexOf(element);
    titleList[index].inlist = true;
    console.log(mylist, element);
};

  

  return (
    <BookContext.Provider
      value={{
        input,
        setInput,
        titleList,
        setTitleList,
        numOfResult,
        setNumOfResult,
        result,
        setResult,
        mylist,
        setMyList,
        sorted,
        setSorted,
        addtoMyList,
        message,
        setMessage,
        listToShow, setListToShow,
        filtered, setFiltered,
        isLoading, setIsLoading
      }}
    >
      <div className="container">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate replace to="home" />} />
            <Route
              path="/home"
              element={
                result ? (
                  <>
                    <Search /> <Result />
                  </>
                ) : (
                  <Search />
                )
              }
            />
            <Route path="/my-list" element={<MyList />} />
          </Routes>
        </main>
      </div>

      {/* <div className="container">
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
              <Search />
              {result ? <Result /> : <></>}
            </Route>
            <Route path="/my-list">
              <MyList />
            </Route>
          </Switch>
        </main>
      </div> */}
    </BookContext.Provider>
  );
}

export default App;