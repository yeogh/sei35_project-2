import React, { useContext } from "react";
import BookContext from "./book-context";
import axios from 'axios';

const Search = () => {
  const bookCtx = useContext(BookContext);

  let titleArr = [];
  let authorArr = [];
  let pubYearArr = [];
  let olidArr = [];
  let coverImgArr = [];
  let isbnArr = [];
  let inMyListArr = [];
  let langArr = [];

//Using Axios
const fetchSearchPost = async () => { 
  const searchurl = "http://openlibrary.org/search.json?q=";
  const res = await axios.get(searchurl + bookCtx.input);
  const searchdata = res.data;
  console.log(searchdata);

  //Using Fetch API
  // const fetchSearchPost = async () => {
  //   const searchurl = "http://openlibrary.org/search.json?q=";
  //   const res = await fetch(searchurl + bookCtx.input);
  //   const searchdata = await res.json();
  //   console.log(searchdata);

    for (let i = 0; i < searchdata.docs.length; i++) {
      titleArr[i] = searchdata.docs[i].title;

      if (searchdata.docs[i].author_name) {
        authorArr[i] = searchdata.docs[i].author_name.join(", ");
      } else {
        authorArr[i] = "Author data not found";
      }

      pubYearArr[i] = searchdata.docs[i].publish_year;
      if (pubYearArr[i]) {
        pubYearArr[i] = Math.max(...pubYearArr[i]);
      } else {
        pubYearArr[i] = 0;
      }

      olidArr[i] = `${searchdata.docs[i].cover_edition_key}-M.jpg`;
      if (olidArr[i] === "undefined-M.jpg") {
        coverImgArr[i] = false;
      } else {
        coverImgArr[i] = true;
      }

      isbnArr[i] = searchdata.docs[i].isbn;

      inMyListArr[i] = false;

      langArr[i] = searchdata.docs[i].language;
      if (langArr[i]) {
        langArr[i] = langArr[i][0];
      } else {
        langArr[i] = "und";
      }

      bookCtx.setTitleList((prevState) => {
        return [
          ...prevState,
          {
            title: titleArr[i],
            author: [authorArr[i]],
            pubYear: [pubYearArr[i]],
            olid: olidArr[i],
            coverimg: coverImgArr[i],
            isbn: isbnArr[i],
            inlist: inMyListArr[i],
            lang: langArr[i],
          },
        ];
      });

      console.log("TitleArr:" + titleArr);
      console.log("AuthorArr:" + authorArr[8]);
      console.log(typeof authorArr[8], authorArr[8]);
      console.log("PubYearArr:" + pubYearArr[0]);
      console.log("OlidArr:" + olidArr);
      console.log("ISBNArr:" + isbnArr);
      console.log(langArr);
    }
    bookCtx.setNumOfResult(searchdata.num_found);

    console.log("NumFound:" + searchdata.num_found);
    console.log(bookCtx.numOfResult);
  };

  const handleInputChange = (event) => {
    bookCtx.setInput(event.target.value);
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (bookCtx.input === "") {
      bookCtx.setTitleList([]);
      bookCtx.setNumOfResult("");
      bookCtx.setSorted(false);
      bookCtx.setResult(false);
      bookCtx.setMessage("Please input search term");
    } else {
      bookCtx.setTitleList([]);
      bookCtx.setNumOfResult("");
      bookCtx.setSorted(false);
      fetchSearchPost();
      bookCtx.setResult(true);
      bookCtx.setMessage("");
      // document.getElementById("numofresults").style.visibility = "visible";
    }
  };

  // const removeSearch = () => {
  //   bookCtx.setInput("");
  //   bookCtx.setTitleList([]);
  //   bookCtx.setNumOfResult("");
  //   bookCtx.setSorted(false);
  // };

  return (
    <>
      <div className="input-group mb-3 col-xs-4 ">
        <form className="container" onSubmit={handleFormSubmission}>
          <input
            className="form-control"
            type="text"
            value={bookCtx.input}
            onChange={handleInputChange}
            placeholder="Enter title/author keyword"
          />

          <button className="btn btn-outline-dark">Search</button>
        </form>

        {/* <button
          type="button"
          className="btn btn-outline-primary"
          onClick={removeSearch}
        >
          Clear Search
        </button> */}
      </div>
      <h6 id="message">{bookCtx.message}</h6>
    </>
  );
};

export default Search;
