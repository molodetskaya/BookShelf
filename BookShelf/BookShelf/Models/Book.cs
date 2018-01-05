namespace BookShelf.Models
{
    using System.ComponentModel.DataAnnotations;
    public class Book
    {
        [Key]
        public int BookId { get; set; }
        public string BookName { get; set; }
        public string BookAuthor { get; set; }
    }
}