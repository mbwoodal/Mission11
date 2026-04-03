import { useState } from "react";
import { addBook } from "../api/BooksAPI";
import type { Book } from "../Book";

interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    bookID: 0,
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    classification: "",
    category: "",
    pageCount: 0,
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3">
      <h2 className="mb-3">Add New Book</h2>

      <div className="mb-2">
        <label className="form-label">Title:</label>
        <input
          className="form-control"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Author:</label>
        <input
          className="form-control"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Publisher:</label>
        <input
          className="form-control"
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">ISBN:</label>
        <input
          className="form-control"
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Classification:</label>
        <input
          className="form-control"
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Page Count:</label>
        <input
          className="form-control"
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price:</label>
        <input
          className="form-control"
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-success me-2">
        Add Book
      </button>
      <button type="button" onClick={onCancel} className="btn btn-secondary">
        Cancel
      </button>
    </form>
  );
};

export default NewBookForm;