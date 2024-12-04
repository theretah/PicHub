using CMSReactDotNet.Server.Data.UnitOfWork;
using PicHub.Server.Entities;

namespace PicHub.IntegrationTests
{
    public static class Utilities
    {
        private static async Task SeedDatabaseAsync(IUnitOfWork unit)
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

            await unit.AppUsers.AddRangeAsync(user, user2, user3);
            unit.Complete();

            await unit.Posts.AddAsync(
                new Post
                {
                    AuthorId = id,
                    PhotoContent = [],
                    Caption = "Old Caption",
                    CommentsAllowed = true,
                    CreateDate = DateTime.Now,
                }
            );
            unit.Complete();

            await unit.Blocks.AddAsync(new Block { BlockerId = id, BlockedId = id3 });
            unit.Complete();
        }

        public static async Task InitializeDatabaseAsync(IUnitOfWork unit)
        {
            unit.EnsureDeleted();
            unit.EnsureCreated();
            await SeedDatabaseAsync(unit);
        }

        public static async Task CleanupAsync(IUnitOfWork unit)
        {
            unit.AppUsers.ExecuteDelete();
            unit.Posts.ExecuteDelete();
            unit.Complete();
            await SeedDatabaseAsync(unit);
        }
    }
}
