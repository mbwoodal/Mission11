import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import type { Book } from "../Book";
import Header from "./Header";

function BookstorePage() {
  const { addToCart, cartCount, cartSubtotal } = useCart();

  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("title_asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        "https://mission13-backend-hvbwgmb4ehh8akc7.swedencentral-01.azurewebsites.net/BookstoreCategories"
      );
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/Bookstore/Books?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}&category=${encodeURIComponent(
          selectedCategory
        )}`
      );

      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategory]);

  return (
    <div className="container mt-4">
      <Header />
      <div>
        <div className="toast-header">
          <strong className="me-auto">Cart</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
          ></button>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <h5 className="mb-1">Cart Summary</h5>
                  <div>
                    <span className="badge bg-primary me-2">{cartCount}</span>
                    item(s) | Subtotal: ${cartSubtotal.toFixed(2)}
                  </div>
                </div>

                <Link to="/cart" className="btn btn-primary">
                  View Cart
                </Link>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mb-3 gap-3 flex-wrap">
            <div>
              <label className="me-2 fw-bold">Filter by category:</label>
              <select
                className="form-select d-inline w-auto"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setPageNum(1);
                }}
              >
                <option value="All">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

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
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
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
              <div className="col-md-6 col-xl-4 mb-4" key={b.bookID}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">{b.title}</h5>
                    <ul className="list-unstyled mt-3">
                      <li>
                        <strong>Author:</strong> {b.author}
                      </li>
                      <li>
                        <strong>Publisher:</strong> {b.publisher}
                      </li>
                      <li>
                        <strong>ISBN:</strong> {b.isbn}
                      </li>
                      <li>
                        <strong>Category:</strong> {b.classification}
                      </li>
                      <li>
                        <strong>Pages:</strong> {b.pageCount}
                      </li>
                      <li>
                        <strong>Price:</strong>{" "}
                        <span className="text-success fw-bold">
                          ${b.price.toFixed(2)}
                        </span>
                      </li>
                    </ul>

                    <button
                      className="btn btn-success mt-auto"
                      onClick={() => addToCart(b)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center gap-2 my-4 flex-wrap">
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

        <div className="col-lg-4">
          <div className="accordion" id="bookAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFilters">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilters"
                  aria-expanded="true"
                  aria-controls="collapseFilters"
                >
                  Quick Info
                </button>
              </h2>
              <div
                id="collapseFilters"
                className="accordion-collapse collapse show"
                aria-labelledby="headingFilters"
                data-bs-parent="#bookAccordion"
              >
                <div className="accordion-body">
                  <p className="mb-1">
                    <strong>Category:</strong> {selectedCategory}
                  </p>
                  <p className="mb-1">
                    <strong>Page:</strong> {pageNum} of {totalPages}
                  </p>
                  <p className="mb-0">
                    <strong>Total books:</strong> {totalItems}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookstorePage;
