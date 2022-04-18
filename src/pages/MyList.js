import React, { useContext } from "react";
import noimage from "../images/no_image_icon.png";
import BookContext from "./book-context";

const MyList = () => {
  const bookCtx = useContext(BookContext);
  console.log(bookCtx.mylist);

  return (
    <>
      <div className="row row-cols-3 row-cols-md-6 g-4">
        {bookCtx.mylist.map((element, index) => (
          <div className="col" key={index}>
            <div className="card h-100">
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
                  <strong>{element.title}</strong>
                  <br />
                  <em>{element.author}</em> <br />
                  {element.pubYear}
                </p>
              </div>
              <button onClick={() => bookCtx.removefromMyList(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyList;
