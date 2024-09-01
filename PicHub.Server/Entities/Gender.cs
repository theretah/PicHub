using System.ComponentModel.DataAnnotations.Schema;

namespace PicHub.Server.Entities
{
    public class Gender
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public required string Title { get; set; }

        public IEnumerable<AppUser>? Users { get; set; }
    }
}
