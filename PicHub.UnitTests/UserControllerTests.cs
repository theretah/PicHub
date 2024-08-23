using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PicHub.Server.Controllers;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;

namespace PicHub.UnitTests
{
    public class UserControllerTests
    {
        private readonly Mock<IUserStore<AppUser>> userStoreMock;
        private readonly Mock<UserManager<AppUser>> userManagerMock;
        private readonly UserController controller;

        public UserControllerTests()
        {
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
            var config = new MapperConfiguration(c =>
            {
                c.CreateMap<AppUser, UserDto>();
            });
            var mapper = config.CreateMapper();
            controller = new UserController(userManagerMock.Object, null, null, null, mapper);
        }

        [Fact]
        public void GetAllUsers_ShouldReturnAllUsers()
        {
            // Arrange
            var users = new List<AppUser>
            {
                new AppUser
                {
                    UserName = "username1",
                    FullName = "Full Name 1",
                    Email = "user1@gmail.com",
                    EmailConfirmed = true,
                    RegistrationDate = DateTime.Now,
                },
                new AppUser
                {
                    UserName = "username2",
                    FullName = "Full Name 2",
                    Email = "user2@gmail.com",
                    EmailConfirmed = true,
                    RegistrationDate = DateTime.Now,
                },
                new AppUser
                {
                    UserName = "username3",
                    FullName = "Full Name 3",
                    Email = "user3@gmail.com",
                    EmailConfirmed = true,
                    RegistrationDate = DateTime.Now,
                },
            }.AsQueryable();
            userManagerMock.Setup(um => um.Users).Returns(() => users);

            // Act
            var actionResult = controller.GetAllUsers();

            // Assert
            var result = actionResult.Result as OkObjectResult;
            Assert.NotNull(result);

            var returnResult = Assert.IsAssignableFrom<IEnumerable<UserDto>>(result.Value);
            Assert.Equal(3, returnResult.Count());
            Assert.Contains(returnResult, u => u.UserName == "username1");
            Assert.Contains(returnResult, u => u.UserName == "username2");
            Assert.Contains(returnResult, u => u.UserName == "username3");
        }

        [Fact]
        public void GetAllUsers_UsersEmpty_ShouldReturnNoContentResult()
        {
            // Arrange
            userManagerMock.Setup(um => um.Users).Returns(() => new List<AppUser>().AsQueryable());

            // Act
            var actionResult = controller.GetAllUsers();

            // Assert
            var result = actionResult.Result as NoContentResult;
            Assert.NotNull(result);
        }
    }
}
