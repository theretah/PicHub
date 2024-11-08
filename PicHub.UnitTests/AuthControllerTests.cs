using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Moq;
using PicHub.Server.Controllers;
using PicHub.Server.DTOs;
using PicHub.Server.Entities;
using PicHub.Server.Enums;

namespace PicHub.UnitTests
{
    public class AuthControllerTests
    {
        private readonly AuthController controller;
        private readonly Mock<IUserStore<AppUser>> userStoreMock;
        private readonly Mock<UserManager<AppUser>> userManagerMock;
        private readonly AppUser user;
        private readonly RegisterDto validRegisterDto;

        private const string Issuer = "https://localhost:4000";
        private const string Audience = "https://localhost:4000";
        private const string Secret = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
        private readonly Mock<IConfiguration> Config = new Mock<IConfiguration>();

        public AuthControllerTests()
        {
            Config.SetupGet(c => c["JwtConfig:Secret"]).Returns(Secret);
            Config.SetupGet(c => c["JwtConfig:ValidIssuer"]).Returns(Issuer);
            Config.SetupGet(c => c["JwtConfig:ValidAudiences"]).Returns(Audience);

            user = new(
                userName: "username1",
                fullName: "Full name 1",
                email: "user1@gmail.com",
                phoneNumber: string.Empty,
                isPrivate: false,
                genderId: (int)Genders.NotSpecified,
                accountCategoryId: (int)AccountCategories.Personal,
                professionalCategoryId: null
            );
            validRegisterDto = new()
            {
                UserName = user.UserName,
                Email = user.Email,
                Password = "Password@1234",
                AccountCategoryId = user.AccountCategoryId,
                GenderId = user.GenderId,
                ProfessionalCategoryId = user.ProfessionalCategoryId,
                FullName = user.FullName,
            };
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
            controller = new AuthController(mapper, Config.Object, userManagerMock.Object);
        }

        [Fact]
        public async Task Register_UserWithThisEmailExists_ReturnsBadRequest()
        {
            // Arrange
            var email = "existingEmail@gmail.com";
            userManagerMock.Setup(u => u.FindByEmailAsync(email)).ReturnsAsync(() => user);

            // Act
            var actionResult = await controller.RegisterAsync(
                new RegisterDto
                {
                    UserName = string.Empty,
                    Email = email,
                    Password = string.Empty,
                    AccountCategoryId = 1,
                    GenderId = 1,
                    ProfessionalCategoryId = null,
                    FullName = string.Empty,
                }
            );

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult);
            Assert.Equal(
                "User with this email address already exists.",
                badRequestResult.Value.ToString()
            );
        }

        [Fact]
        public async Task Register_UserWithThisUserNameExists_ReturnsBadRequest()
        {
            // Arrange
            var userName = "existingUserName";
            userManagerMock.Setup(u => u.FindByNameAsync(userName)).ReturnsAsync(() => user);

            // Act
            var actionResult = await controller.RegisterAsync(
                new RegisterDto
                {
                    UserName = userName,
                    Email = string.Empty,
                    Password = string.Empty,
                    AccountCategoryId = 1,
                    GenderId = 1,
                    ProfessionalCategoryId = null,
                    FullName = string.Empty,
                }
            );

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult);
            Assert.Equal(
                "User with this username already exists.",
                badRequestResult.Value.ToString()
            );
        }

        [Fact]
        public async Task Register_CreateNotSucceeded_ReturnsBadRequest()
        {
            // Arrange
            userManagerMock
                .Setup(u => u.CreateAsync(It.IsAny<AppUser>(), "Password@1234"))
                .ReturnsAsync(IdentityResult.Failed());

            // Act
            var actionResult = await controller.RegisterAsync(validRegisterDto);

            // Assert
            Assert.IsType<BadRequestObjectResult>(actionResult);
        }

        [Fact]
        public async Task Register_UserNotFoundByUserName_ReturnsBadRequest()
        {
            // Arrange
            userManagerMock
                .Setup(u => u.CreateAsync(It.IsAny<AppUser>(), "Password@1234"))
                .ReturnsAsync(IdentityResult.Success);
            userManagerMock
                .Setup(u => u.FindByNameAsync(It.IsAny<string>()))
                .ReturnsAsync(() => null);

            // Act
            var actionResult = await controller.RegisterAsync(validRegisterDto);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult);
            Assert.Equal(
                "A problem occured while registering the user.",
                badRequestResult.Value.ToString()
            );
        }

        [Fact]
        public async Task Register_InvalidPassword_ReturnsBadRequest()
        {
            // Arrange
            userManagerMock
                .Setup(u => u.CreateAsync(It.IsAny<AppUser>(), "Password@1234"))
                .ReturnsAsync(IdentityResult.Success);
            userManagerMock
                .SetupSequence(u => u.FindByNameAsync(It.IsAny<string>()))
                .ReturnsAsync(() => null)
                .ReturnsAsync(() => user);
            userManagerMock
                .Setup(u => u.CheckPasswordAsync(user, It.IsAny<string>()))
                .ReturnsAsync(() => false);

            // Act
            var actionResult = await controller.RegisterAsync(validRegisterDto);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(actionResult);
            Assert.Equal("Invalid password.", badRequestResult.Value.ToString());
        }

        [Fact]
        public async Task Register_RedirectsToLogin()
        {
            // Arrange
            userManagerMock
                .Setup(u => u.CreateAsync(It.IsAny<AppUser>(), "Password@1234"))
                .ReturnsAsync(IdentityResult.Success);
            userManagerMock
                .SetupSequence(u => u.FindByNameAsync(It.IsAny<string>()))
                .ReturnsAsync(() => null)
                .ReturnsAsync(() => user);
            userManagerMock
                .Setup(u => u.CheckPasswordAsync(user, It.IsAny<string>()))
                .ReturnsAsync(() => true);
            var loginDto = new LoginDto
            {
                Password = validRegisterDto.Password,
                UserName = validRegisterDto.UserName,
            };

            // Act
            var createdResult = (CreatedAtActionResult)
                await controller.RegisterAsync(validRegisterDto);

            // Assert
            Assert.Equal("login", createdResult.ActionName);
            var value = createdResult.Value as LoginDto;
            Assert.Equal(loginDto.UserName, value.UserName);
            Assert.Equal(loginDto.Password, value.Password);
        }
    }
}
