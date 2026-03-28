import { useEffect, useState } from "react";
import type { Book } from "./Book";

function Bookstore() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("title_asc");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/Bookstore/Books?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}`
      );

      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder]);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Prof Hilton's Bookstore</h1>

      <div className="d-flex justify-content-center mb-3 gap-3">
        <div>
          <label className="me-2 fw-bold">Sort by title:</label>
          <select
            className="form-select d-inline w-auto"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setPageNum(1);
            }}
          >
            <option value="title_asc">Title A-Z</option>
            <option value="title_desc">Title Z-A</option>
          </select>
        </div>

        <div>
          <label className="me-2 fw-bold">Results per page:</label>
          <select
            className="form-select d-inline w-auto"
            value={pageSize}
            onChange={(p) => {
              setPageSize(Number(p.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      <div className="row">
        {books.map((b) => (
          <div className="col-md-4 mb-4" key={b.bookID}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-primary">{b.title}</h5>

                <ul className="list-unstyled mt-3">
                  <li><strong>Author:</strong> {b.author}</li>
                  <li><strong>Publisher:</strong> {b.publisher}</li>
                  <li><strong>ISBN:</strong> {b.isbn}</li>
                  <li><strong>Category:</strong> {b.classification}</li>
                  <li><strong>Pages:</strong> {b.pageCount}</li>
                  <li>
                    <strong>Price:</strong>{" "}
                    <span className="text-success fw-bold">
                      ${b.price}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-2 my-4">
        <button
          className="btn btn-outline-primary"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`btn ${
              pageNum === i + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setPageNum(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-primary"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Bookstore;