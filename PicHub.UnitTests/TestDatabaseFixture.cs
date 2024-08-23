using PicHub.Server.Entities;

namespace PicHub.UnitTests
{
    public class TestDatabaseFixture
    {
        public List<AppUser> Users { get; set; } = new();
        public List<Post> Posts { get; set; } = new();

        public TestDatabaseFixture()
        {
            InitializeDatabase();
        }

        // Initialize the database
        public void InitializeDatabase() { }
    }
}
