using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mission11.Data;

public class BookstoreDbContext : DbContext
{
    // GET
    public BookstoreDbContext(DbContextOptions<BookstoreDbContext> options) : base(options)
    {
    }
    
    public DbSet<Book> Books { get; set; }
}