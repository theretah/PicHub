using Microsoft.Extensions.Configuration;
using PicHub.Server.Validation;

namespace PicHub.UnitTests
{
    public class UserNameValidationTests
    {
        private const string LengthError =
            "Username is too long or too short. Must not be more than 20 or less than 8 characters.";
        private const string ContainsIllegalCharacterError =
            "Lowercase characters(a-z), digits(0-9), dot(.), and underscore(_) are the only characters allowed.";
        private const string IllegalOrderOfCharactersError =
            "Username cannot start with digits, dot or underscore. Also cannot end with  dot or underscore.";

        private readonly IConfiguration Configuration;
        private readonly IValidationService validationService;

        public UserNameValidationTests()
        {
            var inMemorySettings = new Dictionary<string, string>
            {
                { "RegexErrorMessages:UserName:LengthError", LengthError },
                {
                    "RegexErrorMessages:UserName:ContainsIllegalCharacter",
                    ContainsIllegalCharacterError
                },
                {
                    "RegexErrorMessages:UserName:IllegalOrderOfCharacters",
                    IllegalOrderOfCharactersError
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

            Assert.Equal(LengthError, validationErrorMessage);
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
        public void ContainsIllegalCharacter_ReturnsContainsIllegalCharacterError(
            string specialCharacter
        )
        {
            var validationErrorMessage = validationService
                .ValidateUserName("user" + specialCharacter + "name")
                .First()
                .ErrorMessage;

            Assert.Equal(ContainsIllegalCharacterError, validationErrorMessage);
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

            Assert.Equal(IllegalOrderOfCharactersError, validationErrorMessage);
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
