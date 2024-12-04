using System.Text.Json;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
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
                c.CreateMap<AppUser, UserDTO>();
            });
            var mapper = config.CreateMapper();
            controller = new UserController(userManagerMock.Object, null, null, mapper);
        }

        [Fact]
        public void GetAll_ReturnsAllUsersAndOkResult()
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
            };
            userManagerMock.Setup(um => um.Users).Returns(() => users.AsQueryable());

            // Act
            var actionResult = controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);

            var returnResult = Assert.IsAssignableFrom<IEnumerable<UserDTO>>(okResult.Value);
            Assert.Equal(3, returnResult.Count());
            Assert.Contains(returnResult, u => u.UserName == "username1");
            Assert.Contains(returnResult, u => u.UserName == "username2");
            Assert.Contains(returnResult, u => u.UserName == "username3");
        }

        [Fact]
        public void GetAll_UsersEmpty_ReturnsOkResult()
        {
            // Arrange
            var users = new List<AppUser>();
            userManagerMock.Setup(um => um.Users).Returns(() => users.AsQueryable());

            // Act
            var actionResult = controller.GetAll();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnResult = Assert.IsAssignableFrom<IEnumerable<UserDTO>>(okResult.Value);
            Assert.Empty(returnResult);
        }

        [Theory]
        [InlineData("user", 2)]
        [InlineData("user_", 1)]
        [InlineData("someuser", 1)]
        [InlineData("the", 2)]
        [InlineData("us", 3)]
        public void Search_PatternMatches_ReturnsMatchedUsers(string query, int resultsCount)
        {
            var users = new List<AppUser>
            {
                new(
                    userName: "someuser",
                    fullName: string.Empty,
                    email: string.Empty,
                    phoneNumber: string.Empty,
                    isPrivate: false,
                    genderId: 0,
                    accountCategoryId: 0,
                    professionalCategoryId: 0
                ),
                new(
                    userName: "user_123another",
                    fullName: string.Empty,
                    email: string.Empty,
                    phoneNumber: string.Empty,
                    isPrivate: false,
                    genderId: 0,
                    accountCategoryId: 0,
                    professionalCategoryId: 0
                ),
                new(
                    userName: "the_us3r",
                    fullName: string.Empty,
                    email: string.Empty,
                    phoneNumber: string.Empty,
                    isPrivate: false,
                    genderId: 0,
                    accountCategoryId: 0,
                    professionalCategoryId: 0
                ),
            };
            userManagerMock.Setup(um => um.Users).Returns(() => users.AsQueryable());

            var actionResult = controller.Search(query);

            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            // Assert.IsAssignableFrom<OkObjectResult>(actionResult);

            var returnResult = Assert.IsAssignableFrom<IEnumerable<UserDTO>>(okResult.Value);
            Assert.Contains(returnResult, u => u.UserName.Contains(query));
            Assert.Equal(resultsCount, returnResult.Count());
        }

        [Theory]
        [InlineData("us_3r")]
        [InlineData("useer")]
        public void Search_PatternDoesNotMatch_ReturnsNotFound(string query)
        {
            var users = new List<AppUser>
            {
                new(
                    userName: "someuser",
                    fullName: string.Empty,
                    email: string.Empty,
                    phoneNumber: string.Empty,
                    isPrivate: false,
                    genderId: 0,
                    accountCategoryId: 0,
                    professionalCategoryId: 0
                ),
                new(
                    userName: "user_123another",
                    fullName: string.Empty,
                    email: string.Empty,
                    phoneNumber: string.Empty,
                    isPrivate: false,
                    genderId: 0,
                    accountCategoryId: 0,
                    professionalCategoryId: 0
                ),
                new(
                    userName: "the_us3r",
                    fullName: string.Empty,
                    email: string.Empty,
                    phoneNumber: string.Empty,
                    isPrivate: false,
                    genderId: 0,
                    accountCategoryId: 0,
                    professionalCategoryId: 0
                ),
            };
            userManagerMock.Setup(um => um.Users).Returns(() => users.AsQueryable());

            var actionResult = controller.Search(query);

            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result);
            var returnResult = Assert.IsAssignableFrom<IEnumerable<UserDTO>>(okResult.Value);
            Assert.Empty(returnResult);
        }
    }
}
