using BookShelf.Models;
using Dapper.Repositories;
using System.Configuration;
using System.Web.Mvc;

namespace BookShelf.Controllers
{
    public class HomeController : Controller
    {
        IBookRepository bookRepository = new BookRepository(ConfigurationManager.ConnectionStrings["BooksEntities"].ConnectionString);
        public ActionResult Index()
        {
            var model = bookRepository.GetAllBooks();
            return View(model);
        }
        public ActionResult List()
        {
            return PartialView(bookRepository.GetAllBooks());
        }
        public ActionResult ConfirmModal()
        {
            return PartialView();
        }
        public ActionResult EditBook(int id)
        {
            Models.Book bs = bookRepository.Get(id);
            if (null == bs)
            {
                return HttpNotFound();
            }
            return PartialView(bs);
        }
        [HttpPost]
        public bool EditBook(int BookId, string BookName, string BookAuthor)
        {
            if (ModelState.IsValid)
            {
                Models.Book bs = bookRepository.Get(BookId);
                if (null == bs)
                {
                    return false;
                }
                bs.BookName = BookName;
                bs.BookAuthor = BookAuthor;
                bookRepository.Update(bs);
                return true;
            }
            return false;
        }
        [HttpGet]
        public string GetName(int id)
        {
            Models.Book bs = bookRepository.Get(id);
            if (null == bs)
            {
                return "";
            }
            return bs.BookName;
        }

        public ActionResult AddBook()
        {
            return PartialView("AddBook");
        }
        [HttpPost]
        public bool AddBook(string BookName, string BookAuthor)
        {
            if (ModelState.IsValid)
            {
                Models.Book bs = new Models.Book() { BookName = BookName, BookAuthor = BookAuthor };
                bookRepository.Create(bs);
                return true;
            }
            return false;
        }
        [HttpPost]
        public ActionResult DeleteBook(int id)
        {
            bookRepository.Delete(id);
            return RedirectToAction("List");
        }
        public Models.Book GetBook(int id)
        {
            Models.Book bs = bookRepository.Get(id);
            if (null == bs)
            {
                return null;
            }
            return bs;
        }
    }
}