using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreDbContext _bookContext;

        public BookstoreController(BookstoreDbContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("Books")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "title_asc")
        {
            var booksQuery = _bookContext.Books.AsQueryable();

            if (sortOrder == "title_desc")
            {
                booksQuery = booksQuery.OrderByDescending(b => b.Title);
            }
            else
            {
                booksQuery = booksQuery.OrderBy(b => b.Title);
            }

            var totalNumBooks = booksQuery.Count();

            var books = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var someObject = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }
    }
}