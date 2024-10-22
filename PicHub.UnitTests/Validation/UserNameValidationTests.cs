using Microsoft.Extensions.Configuration;
using PicHub.Server.Validation;

namespace PicHub.UnitTests.Validation
{
    public class UserNameValidationTests
    {
        private readonly IConfiguration Configuration;
        private readonly IValidationService validationService;

        public UserNameValidationTests()
        {
            var inMemorySettings = new Dictionary<string, string>
            {
                {
                    "RegexErrorMessages:UserName:LengthError",
                    ValidationFixture.UserName_LengthError
                },
                {
                    "RegexErrorMessages:UserName:ContainsIllegalCharacter",
                    ValidationFixture.UserName_ContainsIllegalCharacterError
                },
                {
                    "RegexErrorMessages:UserName:IllegalOrderOfCharacters",
                    ValidationFixture.UserName_IllegalOrderOfCharactersError
                },
            };

            Configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();

            validationService = new ValidationService(Configuration);
        }

        [Theory]
        [InlineData("short")]
        [InlineData("toolongstringforusername")]
        public void TooShortOrTooLong_ReturnsLengthError(string userName)
        {
            var validationErrorMessage = validationService
                .ValidateUserName(userName)
                .First()
                .ErrorMessage;

            Assert.Equal(ValidationFixture.UserName_LengthError, validationErrorMessage);
        }

        [Theory]
        [InlineData("C")]
        [InlineData("!")]
        [InlineData("@")]
        [InlineData("#")]
        [InlineData("$")]
        [InlineData("%")]
        [InlineData("^")]
        [InlineData("&")]
        [InlineData("*")]
        [InlineData("(")]
        [InlineData("{")]
        [InlineData("[")]
        [InlineData("<")]
        [InlineData(",")]
        [InlineData("?")]
        [InlineData("-")]
        [InlineData("+")]
        [InlineData("=")]
        [InlineData("/")]
        [InlineData(" ")]
        public void ContainsIllegalCharacter_ReturnsContainsIllegalCharacterError(
            string illegalCharacter
        )
        {
            var userName = "user" + illegalCharacter + "name";

            var validationErrorMessage = validationService
                .ValidateUserName(userName)
                .First()
                .ErrorMessage;

            Assert.Equal(
                ValidationFixture.UserName_ContainsIllegalCharacterError,
                validationErrorMessage
            );
        }

        [Theory]
        [InlineData("1username")]
        [InlineData(".username")]
        [InlineData("_username")]
        [InlineData("username_")]
        [InlineData("username.")]
        public void IllegalOrderOfCharacters_ReturnsIllegalOrderOfCharactersError(string userName)
        {
            var validationErrorMessage = validationService
                .ValidateUserName(userName)
                .First()
                .ErrorMessage;

            Assert.Equal(
                ValidationFixture.UserName_IllegalOrderOfCharactersError,
                validationErrorMessage
            );
        }

        [Theory]
        [InlineData("username")]
        [InlineData("user.name")]
        [InlineData("username1")]
        [InlineData("user1name")]
        [InlineData("user_name")]
        [InlineData("user_.1._name")]
        public void ValidUserName_DoesNotReturnError(string userName)
        {
            var validationResult = validationService.ValidateUserName(userName);

            Assert.Empty(validationResult);
        }
    }
}
