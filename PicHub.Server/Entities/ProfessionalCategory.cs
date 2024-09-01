using System.ComponentModel.DataAnnotations.Schema;

namespace PicHub.Server.Entities
{
    public class ProfessionalCategory
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public required string Title { get; set; }

        public IEnumerable<AppUser>? Users { get; set; }
    }
}
