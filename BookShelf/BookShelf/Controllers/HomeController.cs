using BookShelf.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BookShelf.Controllers
{
    public class HomeController : Controller
    {
        BooksEntities db = new BooksEntities();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult List()
        {
            return PartialView(db.BookShelves);
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult EditForm()
        {
            return PartialView();
        }
        public ActionResult AddForm()
        {
            return PartialView();
        }
        public ActionResult ConfirmModal()
        {
            return PartialView();
        }
        public ActionResult EditBook(int? id)
        {
            Models.BookShelf bs = db.BookShelves.Find(id);

            if (bs == null)
            {
                return HttpNotFound();
            }
            return PartialView(bs);
        }
        [HttpPost]
        public bool EditBook(Models.BookShelf book)
        {
            if (ModelState.IsValid)
            {
                db.Entry(book).State = EntityState.Modified;
                db.SaveChanges();
                return true;
            }
            return false;
        }
        [HttpGet]
        public string GetName(int? id)
        {
            Models.BookShelf bs = db.BookShelves.Find(id);

            if (bs == null)
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
        public bool AddBook(Models.BookShelf book)
        {
            if (ModelState.IsValid)
            {
                db.BookShelves.Add(book);
                db.SaveChanges();
                return true;
            }
            return false;
        }
        [HttpPost]
        public ActionResult DeleteBook(int id)
        {
            Models.BookShelf bs = db.BookShelves.Find(id);

            if (bs == null)
            {
                return HttpNotFound();
            }
            db.BookShelves.Remove(bs);
            db.SaveChanges();
            return RedirectToAction("List");
        }
        public Models.BookShelf GetBook(int? id)
        {
            if (id == null)
            {
                return null;
            }
            Models.BookShelf bs = db.BookShelves.Find(id);

            if (bs == null)
            {
                return null;
            }
            return bs;
        }
        //[HttpGet]
        //public ActionResult test()
        //{

        //}
        //[HttpPost]
        //public void test()
        //{

        //}
    }
}