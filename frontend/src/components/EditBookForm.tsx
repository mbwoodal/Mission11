import { useState } from "react";
import { updateBook } from "../api/BooksAPI";
import type { Book } from "../Book";

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>({ ...book });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(formData.bookID, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-3">
      <h2 className="mb-3">Edit Book</h2>

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

      <button type="submit" className="btn btn-primary me-2">
        Update Book
      </button>
      <button type="button" onClick={onCancel} className="btn btn-secondary">
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;