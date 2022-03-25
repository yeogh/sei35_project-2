import React, { useContext } from "react";
import noimage from "../images/no_image_icon.png";
import BookContext from "./book-context";

const Result = () => {
  const bookCtx = useContext(BookContext);
  console.log(bookCtx.titleList);

  let resultlist = bookCtx.titleList.map((element, index) => {
    return (
      <div
        className="col"
        key={index}
        onClick={() => bookCtx.addtoMyList(element)}
      >
        <div
          className={`card h-100 ${
            element.inlist ? "border-warning border-5" : ""
          }`}
        >
          <img
            className="card-img-top"
            width="50"
            alt="cover"
            src={
              element.coverimg
                ? "https://covers.openlibrary.org/b/olid/" + element.olid
                : noimage
            }
          />
          <div className="card-body">
            <p className="card-title">
              <strong id="cardtitle">{element.title}</strong>
              <br />
              <em id="cardauthor">{element.author}</em> <br />
              {element.pubYear}
            </p>
          </div>
        </div>
      </div>
    );
  });

  const sortedlist = () => {
    bookCtx.titleList.sort((a, b) => b.pubYear - a.pubYear);
    console.log(bookCtx.titleList);
    bookCtx.setSorted(true);
    return resultlist;
  };

  //For creation of language dropdown list
  const langlist = [];
  for (let j = 0; j < bookCtx.titleList.length; j++) {
    langlist[j] = bookCtx.titleList[j].lang;
  }
  console.log(langlist);

  const langlisttidied = langlist.flat();
  console.log(langlisttidied);

  let uniqueLangList = langlisttidied.filter((c, index) => {
    return langlisttidied.indexOf(c) === index;
  });
  console.log(uniqueLangList);

  for (let k = 0; k < uniqueLangList.length; k++) {
    if (uniqueLangList[k] === "und") {
      uniqueLangList.splice(k, 1);
    } else if (uniqueLangList[k] === undefined) {
      uniqueLangList.splice(k, 1);
    }
  }
  console.log(uniqueLangList);

  const convertLang = (element) => {
    if (element === "eng") {
      return "English";
    } else if (element === "ita") {
      return "Italian";
    } else if (element === "ger") {
      return "German";
    } else if (element === "spa") {
      return "Spanish";
    } else if (element === "fre") {
      return "French";
    } else {
      return "Other languages";
    }
  };

  let selectlist = uniqueLangList.map((element, index) => {
    return (
      <option key={index} value={element}>
        {convertLang(element)}
      </option>
    );
  });

  return (
    <>
      <h6 id="numofresults">{bookCtx.numOfResult} record(s) found</h6>
      <div id="filter">
        <button
          id="sortbutton"
          type="button"
          className={`btn btn-outline-primary ${
            bookCtx.sorted ? "disabled" : ""
          }`}
          onClick={sortedlist}
        >
          {bookCtx.sorted
            ? "Sorted by Date (latest to earliest)"
            : "Sort By Date (latest to earliest)"}
        </button>

        <select>{selectlist}</select>
      </div>
      <div className="row row-cols-3 row-cols-md-6 g-4">
        {bookCtx.sorted ? sortedlist() : resultlist}
      </div>

      {/* <div className="table-responsive-sm" id="results">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cover Image</th>
              <th scope="col">Title/Author</th>
              <th scope="col">Year of Pub.</th>
            </tr>
          </thead>
          <tbody>
            {props.titleList.map((element, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    width="150"
                    alt="cover"
                    src={
                      element.coverimg
                        ? "https://covers.openlibrary.org/b/olid/" +
                          element.olid
                        : noimage
                    }
                  />
                </td>

                <td>
                  <strong>{element.title}</strong>
                  <br />
                  <em>{element.author}</em>
                </td>
                <td>{element.pubYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </>
  );
};

export default Result;
