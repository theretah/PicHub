using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace PicHub.IntegrationTests
{
    public static class Utilities
    {
        private static void SeedDatabase(PicHubContext context)
        {
            var id = Guid.NewGuid().ToString();
            var user = new AppUser(
                userName: "username1",
                fullName: "Full name 1",
                email: "user1@gmail.com",
                phoneNumber: string.Empty,
                isPrivate: false,
                genderId: 1,
                accountCategoryId: 1,
                professionalCategoryId: null
            );
            user.Id = id;
            context.AppUsers.Add(user);
            context.SaveChanges();

            context.Posts.Add(
                new Post
                {
                    AuthorId = id,
                    PhotoContent = [],
                    Caption = "Old Caption",
                    CommentsAllowed = true,
                    CreateDate = DateTime.Now,
                }
            );
            context.SaveChanges();
        }

        public static void InitializeDatabase(PicHubContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            SeedDatabase(context);
        }

        public static void Cleanup(PicHubContext context)
        {
            context.AppUsers.ExecuteDelete();
            context.Posts.ExecuteDelete();
            context.SaveChanges();
            SeedDatabase(context);
        }
    }
}
