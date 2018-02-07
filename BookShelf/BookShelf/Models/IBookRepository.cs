using BookShelf.Models;
using System.Collections.Generic;

namespace Dapper.Repositories
{
    public interface IBookRepository
    {
        void Create(Book book);
        void Delete(int id);
        Book Get(int id);
        IEnumerable<Book> GetAllBooks();
        void Update(Book book);
    }
}