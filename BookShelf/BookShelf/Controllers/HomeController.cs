using BookShelf.Models;
using System.Configuration;
using System.Data.Entity;
using System.Linq;
using System.Web.Mvc;

namespace BookShelf.Controllers
{
    public class HomeController : Controller
    {
        BooksEntities db = new BooksEntities(ConfigurationManager.ConnectionStrings[0].ConnectionString);
        public ActionResult Index()
        {
            var model = db.BookShelves.ToList();
            return View(model);
        }
        public ActionResult List()
        {
            return PartialView(db.BookShelves);
        }
        public ActionResult ConfirmModal()
        {
            return PartialView();
        }
        public ActionResult EditBook(int? id)
        {
            if (null == id)
            {
                return null;
            }
            Models.Book bs = db.BookShelves.Find(id);
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
                Models.Book bs = db.BookShelves.FirstOrDefault(m => m.BookId == BookId);
                if (null == bs)
                {
                    return false;
                }
                bs.BookName = BookName;
                bs.BookAuthor = BookAuthor;
                db.Entry(bs).State = EntityState.Modified;
                db.SaveChanges();
                return true;
            }
            return false;
        }
        [HttpGet]
        public string GetName(int? id)
        {
            if (null == id)
            {
                return "";
            }
            Models.Book bs = db.BookShelves.Find(id);
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
                db.BookShelves.Add(bs);
                if (db.SaveChanges() > 0)
                    return true;
            }
            return false;
        }
        [HttpPost]
        public ActionResult DeleteBook(int? id)
        {
            if (null == id)
            {
                return null;
            }
            Models.Book bs = db.BookShelves.Find(id);
            if (null == bs)
            {
                return HttpNotFound();
            }
            db.BookShelves.Remove(bs);
            db.SaveChanges();
            return RedirectToAction("List");
        }
        public Models.Book GetBook(int? id)
        {
            if (null == id)
            {
                return null;
            }
            Models.Book bs = db.BookShelves.Find(id);
            if (null == bs)
            {
                return null;
            }
            return bs;
        }
    }
}