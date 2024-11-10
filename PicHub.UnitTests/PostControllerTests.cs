using System.Security.Claims;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.JsonPatch.Operations;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PicHub.Server.Controllers;
using PicHub.Server.Entities;

namespace PicHub.UnitTests
{
    public class PostControllerTests
    {
        private readonly Mock<IUnitOfWork> unitOfWorkMock;
        private readonly PostController controller;

        public PostControllerTests()
        {
            unitOfWorkMock = new Mock<IUnitOfWork>();
            controller = new PostController(unitOfWorkMock.Object);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, "userIdentification"),
            };
            var identity = new ClaimsIdentity(claims);
            var principal = new ClaimsPrincipal(identity);
            controller.ControllerContext.HttpContext = new DefaultHttpContext { User = principal };
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
                    PhotoContent = [],
                    Caption = string.Empty,
                    CommentsAllowed = true,
                    CreateDate = DateTime.Now,
                },
                new Post
                {
                    AuthorId = "1",
                    PhotoContent = new byte[] { },
                    Caption = string.Empty,
                    CommentsAllowed = true,
                    CreateDate = DateTime.Now,
                },
                new Post
                {
                    AuthorId = "1",
                    PhotoContent = [],
                    Caption = string.Empty,
                    CommentsAllowed = true,
                    CreateDate = DateTime.Now,
                },
                new Post
                {
                    AuthorId = "1",
                    PhotoContent = [],
                    Caption = string.Empty,
                    CommentsAllowed = true,
                    CreateDate = DateTime.Now,
                },
            };
            unitOfWorkMock.Setup(unit => unit.Posts.GetAllAsync()).ReturnsAsync(() => posts);

            // Act
            var actionResult = await controller.GetAllAsync();

            // Assert
            Assert.IsType<OkObjectResult>(actionResult);
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
            Assert.IsType<NoContentResult>(actionResult);
            Assert.Empty(posts);
        }

        [Fact]
        public async Task Update_PostIsNull_ReturnsNotFoundResult()
        {
            // Arrange
            int postId = 1;
            unitOfWorkMock.Setup(unit => unit.Posts.GetByIdAsync(postId)).ReturnsAsync(() => null);

            // Act
            var actionResult = await controller.UpdateAsync(postId, new JsonPatchDocument<Post>());

            // Assert
            Assert.IsType<NotFoundResult>(actionResult);
        }

        [Fact]
        public async Task Update_PatchDocIsNull_ReturnsBadRequestResult()
        {
            // Arrange
            int postId = 1;
            unitOfWorkMock
                .Setup(unit => unit.Posts.GetByIdAsync(postId))
                .ReturnsAsync(
                    () =>
                        new Post
                        {
                            Id = 1,
                            AuthorId = "1",
                            PhotoContent = [],
                            Caption = string.Empty,
                            CommentsAllowed = true,
                            CreateDate = DateTime.Now,
                        }
                );

            // Act
            var actionResult = await controller.UpdateAsync(postId, null);

            // Assert
            Assert.IsType<BadRequestResult>(actionResult);
        }
    }
}
