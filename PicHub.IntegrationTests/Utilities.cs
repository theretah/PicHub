using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace PicHub.IntegrationTests
{
    public static class Utilities
    {
        private static void SeedDatabase(PicHubContext context)
        {
            context.AccountCategories.Add(new AccountCategory { Id = 1, Title = "Personal" });
            context.SaveChanges();

            context.Genders.Add(new Gender { Id = 1, Title = "Male" });
            context.SaveChanges();

            // context.AppUsers.Add(
            //     new AppUser(
            //         userName: "username1",
            //         fullName: "Full name 1",
            //         email: "user1@gmail.com",
            //         phoneNumber: string.Empty,
            //         isPrivate: false,
            //         genderId: 1,
            //         accountCategoryId: 1,
            //         professionalCategoryId: null
            //     )
            // );
            // context.SaveChanges();

            // var user = context.AppUsers.Where(u => u.UserName == "username1").First();
            // context.Posts.Add(
            //     new Post
            //     {
            //         AuthorId = user.Id,
            //         PhotoContent = new byte[] { },
            //         Caption = "",
            //         CommentsAllowed = true,
            //         CreateDate = DateTime.Now,
            //     }
            // );
            // context.SaveChanges();
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
            context.AccountCategories.ExecuteDelete();
            context.Genders.ExecuteDelete();
            context.SaveChanges();
            //SeedDatabase(context);
        }
    }
}
