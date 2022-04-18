import React, { useContext, useEffect } from "react";
import noimage from "../images/no_image_icon.png";
import BookContext from "./book-context";

import LoadingSpinner from "../components/LoadingSpinner"

const Result = () => {

  const bookCtx = useContext(BookContext);

  //For creation of language dropdown list
  const langlist = [];
  for (let j = 0; j < bookCtx.titleList.length; j++) {
    langlist[j] = bookCtx.titleList[j].lang;
  }
 
  const langlisttidied = langlist.flat();

  let uniqueLangList = langlisttidied.filter((c, index) => {
    return langlisttidied.indexOf(c) === index;
  });
  
  for (let k = 0; k < uniqueLangList.length; k++) {
    if (uniqueLangList[k] === "und") {
      uniqueLangList.splice(k, 1);
    } else if (uniqueLangList[k] === undefined) {
      uniqueLangList.splice(k, 1);
    }
  }

  let selectlist = uniqueLangList.map((element, index) => {
    return (
      <option key={index} value={element} >
        {/* {convertLang(element)} */}
        {element}
      </option>
    );
  });
  
  useEffect(() => {
    bookCtx.setListToShow(bookCtx.titleList)

    // console.log(bookCtx.titleList);
    // console.log(langlist);
    // console.log(langlisttidied);
    // console.log(uniqueLangList);
    // console.log(selectlist);

  }, [bookCtx.titleList])

  const handleFilterChange = (e) => {
    // console.log(e.target.value)

    if (e.target.value === "all") {
      bookCtx.setListToShow(bookCtx.titleList)
      bookCtx.setFiltered(false)
    } else {
      bookCtx.setListToShow(bookCtx.titleList.filter(function (element) {
        return element.lang === e.target.value;
        }))
        bookCtx.setFiltered(true)
      }
  }
  
    // const convertLang = (element) => {
    //   if (element === "eng") {
    //     return "English";
    //   } else if (element === "ita") {
    //     return "Italian";
    //   } else if (element === "ger") {
    //     return "German";
    //   } else if (element === "spa") {
    //     return "Spanish";
    //   } else if (element === "fre") {
    //     return "French";
    //   } else {
    //     return "Other languages";
    //   }
    // };


// For sorting of results

  // const sortedlist = () => {
  //   bookCtx.listToShow.sort((a, b) => b.pubYear - a.pubYear);
  //   console.log(bookCtx.titleList);
  //   bookCtx.setSorted(true);
  //   return resultlist;
  // };

  const handleSortChange = (e) => {
    console.log(e.target.value)

    if (e.target.value === "none") {
      // bookCtx.setListToShow(bookCtx.titleList);
      bookCtx.setSorted(0)

    } else if (e.target.value === "title") {
      bookCtx.setListToShow(bookCtx.listToShow.sort(function (a, b) {
      let textA = a.title.toUpperCase();
      let textB = b.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      }));
      bookCtx.setSorted(1)

    } else if (e.target.value === "date") {
      bookCtx.setListToShow(bookCtx.listToShow.sort((a, b) => b.pubYear - a.pubYear));
      bookCtx.setSorted(2)

    }
  }

  let content = "";

  if (bookCtx.titleList) {
    content = bookCtx.listToShow.map((element, index) => {
    return (
     <div
       className="col"
       key={index}
       onClick={() => bookCtx.addtoMyList(element)}
     >
       <div
         className={`card h-100 ${
           element.inlist ? "border-success border-4" : ""
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
} 

if (bookCtx.isLoading) {
  content = (
    <div className="centered">
      <LoadingSpinner />
    </div>
  );
}



  return (
    <>
      <h6 id="numofresults">{bookCtx.filtered ? bookCtx.listToShow.length : bookCtx.numOfResult} record(s) found</h6>
    
      <div id="filter">
        {/* <button
          id="sortbutton"
          type="button"
          className={`btn btn-outline-dark ${bookCtx.sorted ? "disabled" : ""}`}
          onClick={sortedlist}
        >
          {bookCtx.sorted
            ? "Sorted by Date (latest to earliest)"
            : "Sort By Date (latest to earliest)"}
        </button> */}
        
        <div id="language-list">
          <h6>Filter by language:</h6>
          <select onChange={handleFilterChange}>
            <option value="all">All</option>
            {selectlist}
          </select>
        </div>

        <div id="sort">
          <h6>Sort by:</h6>
          <select onChange={handleSortChange}>
            <option value="none">None</option>
            <option value="title">Title (alphabetical)</option>
            <option value="date">Date (latest to earliest)</option>
          </select>
        </div>

      </div>
   
      <div className="row row-cols-3 row-cols-md-6 g-4">
        {/* {bookCtx.sorted ? sortedlist() : resultlist} */}
        {/* {resultlist} */}
        {content}
      </div>
     
    </>
  );
};

export default Result;
