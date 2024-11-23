using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace PicHub.IntegrationTests
{
    public static class Utilities
    {
        private static void SeedDatabase(PicHubContext context)
        {
            var id = "userIdentification";
            var id2 = "userIdentification2";
            var id3 = "userIdentification3";
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

            var user2 = new AppUser(
                userName: "username2",
                fullName: "Full name 2",
                email: "user2@gmail.com",
                phoneNumber: string.Empty,
                isPrivate: false,
                genderId: 1,
                accountCategoryId: 1,
                professionalCategoryId: null
            );
            user2.Id = id2;

            var user3 = new AppUser(
                userName: "username3",
                fullName: "Full name 3",
                email: "user3@gmail.com",
                phoneNumber: string.Empty,
                isPrivate: false,
                genderId: 1,
                accountCategoryId: 1,
                professionalCategoryId: null
            );
            user3.Id = id3;

            context.AppUsers.AddRange(user, user2, user3);
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

            context.Blocks.Add(new Block { BlockerId = id, BlockedId = id3 });
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
