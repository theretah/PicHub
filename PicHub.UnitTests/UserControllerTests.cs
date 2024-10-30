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
        public async void GetAllUsers_ReturnsAllUsers()
        {
            // Arrange
            var users = new List<AppUser>
            {
                new(
                    userName: "username1",
                    fullName: "Full name 1",
                    email: "user1@gmail.com",
                    phoneNumber: string.Empty,
                    isPrivate: false,
                    genderId: 0,
                    accountCategoryId: 0,
                    professionalCategoryId: 0
                ),
                new(
                    userName: "username2",
                    fullName: "Full name 2",
                    email: "user2@gmail.com",
                    phoneNumber: string.Empty,
                    isPrivate: false,
                    genderId: 0,
                    accountCategoryId: 0,
                    professionalCategoryId: 0
                ),
                new(
                    userName: "username3",
                    fullName: "Full name 3",
                    email: "user3@gmail.com",
                    phoneNumber: string.Empty,
                    isPrivate: false,
                    genderId: 0,
                    accountCategoryId: 0,
                    professionalCategoryId: 0
                ),
            }.AsQueryable();
            userManagerMock.Setup(um => um.Users).Returns(() => users);

            // Act
            var actionResult = await controller.GetAllUsersAsync();

            // Assert
            var result = actionResult as OkObjectResult;
            Assert.NotNull(result);

            var returnResult = Assert.IsAssignableFrom<IEnumerable<UserDto>>(result.Value);
            Assert.Equal(3, returnResult.Count());
            Assert.Contains(returnResult, u => u.UserName == "username1");
            Assert.Contains(returnResult, u => u.UserName == "username2");
            Assert.Contains(returnResult, u => u.UserName == "username3");
        }

        [Fact]
        public async Task GetAllUsers_UsersEmpty_ReturnsNoContentResult()
        {
            // Arrange
            userManagerMock.Setup(um => um.Users).Returns(() => new List<AppUser>().AsQueryable());

            // Act
            var actionResult = await controller.GetAllUsersAsync();

            // Assert
            var result = actionResult as NoContentResult;
            Assert.NotNull(result);
        }
    }
}
