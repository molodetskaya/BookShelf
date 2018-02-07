using System.Collections.Generic;
using System.Data;
using Dapper;
using System.Data.SqlClient;
using System.Linq;
using System.Configuration;

namespace BookShelf.Models
{
    public class BookRepository : Dapper.Repositories.IBookRepository
    {
        private readonly string _connectionString;
        public BookRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public IEnumerable<Book> GetAllBooks()
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                return db.Query<Book>("SELECT * FROM Books");
            }
        }

        public Book Get(int id)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                return db.Query<Book>("SELECT * FROM Books WHERE BookId = @id", new { id }).FirstOrDefault();
            }
        }

        public void Create(Book book)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var sqlQuery = "INSERT INTO Books (BookName, BookAuthor) VALUES(@BookName, @BookAuthor); SELECT CAST(SCOPE_IDENTITY() as int)";
                int userId = db.Query<int>(sqlQuery, book).First();
                book.BookId = userId;
            }
        }

        public void Update(Book book)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var sqlQuery = "UPDATE Books SET BookName = @BookName, BookAuthor = @BookAuthor WHERE BookId = @BookId";
                db.Execute(sqlQuery, book);
            }
        }

        public void Delete(int id)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var sqlQuery = "DELETE FROM Books WHERE BookId = @id";
                db.Execute(sqlQuery, new { id });
            }
        }
    }
}