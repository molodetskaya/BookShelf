using System.Data.Entity;

namespace BookShelf.Models
{
    public class BooksEntities : DbContext
    {
        public BooksEntities(string connectionString)
        {
            Database.Connection.ConnectionString = connectionString;
        }
        public BooksEntities()
            :base("BooksEntities")
        {
        }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
        public virtual DbSet<Book> BookShelves { get; set; }
    }
}