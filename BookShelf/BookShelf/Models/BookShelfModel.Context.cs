﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BookShelf.Models
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;

    public partial class BooksEntities : DbContext
    {
        public BooksEntities()
            : base("name=BooksEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }

        public virtual DbSet<BookShelf> BookShelves { get; set; }
            //get {
            //    return new List<BookShelf>()
            //    {
            //        new BookShelf() { BookId = 1, BookAuthor="Достоевский", BookName="Преступление и наказание" },
            //        new BookShelf() { BookId = 2, BookAuthor="Достоевский", BookName="Идиот" },
            //        new BookShelf() { BookId = 3, BookAuthor="Джейн Остин", BookName="Чувства и чувствительность" },
            //        new BookShelf() { BookId = 4, BookAuthor="Джейн Остин", BookName="Гордость и предубеждения" },
            //        new BookShelf() { BookId = 5, BookAuthor="Чехов", BookName="Палата № 6" },
            //        new BookShelf() { BookId = 6, BookAuthor="Макс Фрай", BookName="Лабиринты Эхо" },
            //        new BookShelf() { BookId = 7, BookAuthor="Макс Фрай", BookName="Сновидения Эхо" },
            //        new BookShelf() { BookId = 8, BookAuthor="Стивен Кинг", BookName="Оно" },
            //        new BookShelf() { BookId = 9, BookAuthor="Стивен Кинг", BookName="Темная башня" }
            //    };
            //} set
            //{
            //    ;
            //}
        //}
    }
}
