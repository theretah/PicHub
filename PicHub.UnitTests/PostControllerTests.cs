using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PicHub.Server.Controllers;
using PicHub.Server.Entities;

namespace PicHub.UnitTests
{
    public class PostControllerTests
    {
        private readonly Mock<IUnitOfWork> unitOfWorkMock;
        private readonly Mock<IUserStore<AppUser>> userStoreMock;
        private readonly Mock<UserManager<AppUser>> userManagerMock;
        private readonly PostController controller;

        public PostControllerTests()
        {
            unitOfWorkMock = new Mock<IUnitOfWork>();
            userStoreMock = new Mock<IUserStore<AppUser>>();
            userManagerMock = new Mock<UserManager<AppUser>>(
                userStoreMock.Object,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );
            controller = new PostController(unitOfWorkMock.Object, userManagerMock.Object);
        }

        [Fact]
        public async Task GetAll_PostsExist_ReturnsAllPosts()
        {
            // Arrange
            var posts = new List<Post>
            {
                new Post
                {
                    AuthorId = "1",
                    PhotoContent = new byte[] { },
                    Caption = "",
                    CommentsAllowed = true,
                    CreateDate = DateTime.Now,
                },
                new Post
                {
                    AuthorId = "1",
                    PhotoContent = new byte[] { },
                    Caption = "",
                    CommentsAllowed = true,
                    CreateDate = DateTime.Now,
                },
                new Post
                {
                    AuthorId = "1",
                    PhotoContent = new byte[] { },
                    Caption = "",
                    CommentsAllowed = true,
                    CreateDate = DateTime.Now,
                },
                new Post
                {
                    AuthorId = "1",
                    PhotoContent = new byte[] { },
                    Caption = "",
                    CommentsAllowed = true,
                    CreateDate = DateTime.Now,
                },
            };
            unitOfWorkMock.Setup(unit => unit.Posts.GetAllAsync()).ReturnsAsync(() => posts);

            // Act
            var actionResult = await controller.GetAllAsync();

            // Assert
            var result = actionResult as OkObjectResult;
            Assert.NotNull(result);
            Assert.Equal(4, posts.Count());
        }

        [Fact]
        public async Task GetAll_NoPosts_ReturnsNoContentResult()
        {
            // Arrange
            var posts = new List<Post>();
            unitOfWorkMock.Setup(unit => unit.Posts.GetAllAsync()).ReturnsAsync(() => posts);

            // Act
            var actionResult = await controller.GetAllAsync();

            // Assert
            var result = actionResult as NoContentResult;
            Assert.NotNull(result);
            Assert.Empty(posts);
        }
    }
}
