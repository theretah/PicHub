using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using PicHub.Server.Controllers;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;
using PicHub.Server.Enums;
using PicHub.Server.Validation;

namespace PicHub.UnitTests
{
    public class AuthControllerTests
    {
        private readonly AuthController controller;
        private readonly Mock<IUserStore<AppUser>> userStoreMock;
        private readonly Mock<UserManager<AppUser>> userManagerMock;
        private readonly AppUser user =
            new(
                userName: "username1",
                fullName: "Full name 1",
                email: "user1@gmail.com",
                phoneNumber: string.Empty,
                isPrivate: false,
                genderId: (int)Genders.NotSpecified,
                accountCategoryId: (int)AccountCategories.Personal,
                professionalCategoryId: null
            );

        public AuthControllerTests()
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
            controller = new AuthController(mapper, null, userManagerMock.Object);
        }

        [Fact]
        public async Task Register_UserWithThisEmailExists_ReturnsBadRequest()
        {
            // Arrange
            var email = "user1@gmail.com";
            userManagerMock.Setup(u => u.FindByEmailAsync(email)).ReturnsAsync(() => user);

            // Act
            var actionResult = await controller.Register(
                new RegisterDto
                {
                    UserName = "",
                    Email = "user1@gmail.com",
                    Password = "",
                    AccountCategoryId = 1,
                    GenderId = 1,
                    ProfessionalCategoryId = null,
                    FullName = ""
                }
            );

            // Assert
            var result = actionResult as BadRequestObjectResult;
            Assert.NotNull(result);
            Assert.Equal("User with this email address already exists.", result.Value);
        }

        [Fact]
        public async Task Register_UserWithThisUserNameExists_ReturnsBadRequest()
        {
            // Arrange
            var userName = "username1";
            userManagerMock.Setup(u => u.FindByNameAsync(userName)).ReturnsAsync(() => user);

            // Act
            var actionResult = await controller.Register(
                new RegisterDto
                {
                    UserName = "username1",
                    Email = "",
                    Password = "",
                    AccountCategoryId = 1,
                    GenderId = 1,
                    ProfessionalCategoryId = null,
                    FullName = ""
                }
            );

            // Assert
            var result = actionResult as BadRequestObjectResult;
            Assert.NotNull(result);
            Assert.Equal("User with this username already exists.", result.Value);
        }


    }
}
