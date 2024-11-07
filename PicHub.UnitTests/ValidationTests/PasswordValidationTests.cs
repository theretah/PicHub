using Microsoft.Extensions.Configuration;
using PicHub.Server.Validation;

namespace PicHub.UnitTests.ValidationTests
{
    public class PasswordValidationTests
    {
        private readonly IConfiguration Configuration;
        private readonly IValidationService validationService;

        public PasswordValidationTests()
        {
            var inMemorySettings = new Dictionary<string, string>
            {
                {
                    "RegexErrorMessages:Password:LengthError",
                    ValidationFixture.Password_LengthError
                },
                {
                    "RegexErrorMessages:Password:ContainsIllegalCharacter",
                    ValidationFixture.Password_ContainsIllegalCharacterError
                },
                {
                    "RegexErrorMessages:Password:IllegalOrderOfCharacters",
                    ValidationFixture.Password_IllegalOrderOfCharactersError
                },
                {
                    "RegexErrorMessages:Password:LacksUppercase",
                    ValidationFixture.Password_LacksUppercaseError
                },
                {
                    "RegexErrorMessages:Password:LacksLowercase",
                    ValidationFixture.Password_LacksLowercaseError
                },
                {
                    "RegexErrorMessages:Password:LacksDigit",
                    ValidationFixture.Password_LacksDigitError
                },
                {
                    "RegexErrorMessages:Password:LacksSpecialCharacter",
                    ValidationFixture.Password_LacksSpecialCharacterError
                },
            };

            Configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();

            validationService = new ValidationService(Configuration);
        }

        [Fact]
        public void TooShort_ReturnsLengthError()
        {
            var password = "Pas@123";

            var validationErrorMessage = validationService
                .ValidatePassword(password)
                .First()
                .ErrorMessage;

            Assert.Equal(ValidationFixture.Password_LengthError, validationErrorMessage);
        }

        [Theory]
        [InlineData(" ")]
        [InlineData("<")]
        [InlineData("ش")]
        [InlineData("δ")]
        [InlineData("Ü")]
        public void ContainsIllegalCharacter_ReturnsContainsIllegalCharacterError(
            string illegalCharacter
        )
        {
            var password = "Pass" + illegalCharacter + "word";

            var validationErrorMessage = validationService
                .ValidatePassword(password)
                .First()
                .ErrorMessage;

            Assert.Equal(
                ValidationFixture.Password_ContainsIllegalCharacterError,
                validationErrorMessage
            );
        }

        [Theory]
        [InlineData("@password")]
        [InlineData("1password")]
        public void IllegalOrderOfCharacters_ReturnsIllegalOrderOfCharactersError(string password)
        {
            var validationErrorMessage = validationService
                .ValidatePassword(password)
                .First()
                .ErrorMessage;

            Assert.Equal(
                ValidationFixture.Password_IllegalOrderOfCharactersError,
                validationErrorMessage
            );
        }

        [Fact]
        public void LacksUppercase_ReturnsLacksUppercaseError()
        {
            var password = "password@1234";

            var validationErrorMessage = validationService
                .ValidatePassword(password)
                .First()
                .ErrorMessage;

            Assert.Equal(ValidationFixture.Password_LacksUppercaseError, validationErrorMessage);
        }

        [Fact]
        public void LacksLowercase_ReturnsLacksLowercaseError()
        {
            var password = "PASSWORD@1234";

            var validationErrorMessage = validationService
                .ValidatePassword(password)
                .First()
                .ErrorMessage;

            Assert.Equal(ValidationFixture.Password_LacksLowercaseError, validationErrorMessage);
        }

        [Fact]
        public void LacksDigit_ReturnsLacksDigitError()
        {
            var password = "Password@";

            var validationErrorMessage = validationService
                .ValidatePassword(password)
                .First()
                .ErrorMessage;

            Assert.Equal(ValidationFixture.Password_LacksDigitError, validationErrorMessage);
        }

        [Fact]
        public void LacksSpecialCharacter_ReturnsLacksSpecialCharacterError()
        {
            var password = "Password1234";

            var validationErrorMessage = validationService
                .ValidatePassword(password)
                .First()
                .ErrorMessage;

            Assert.Equal(
                ValidationFixture.Password_LacksSpecialCharacterError,
                validationErrorMessage
            );
        }

        [Theory]
        [InlineData("Password@1234")]
        [InlineData("Password1234@")]
        [InlineData("P@1234assword")]
        [InlineData("P2-3=4assword@")]
        public void ValidPassword_DoesNotReturnError(string password)
        {
            var validationResult = validationService.ValidatePassword(password);

            Assert.Empty(validationResult);
        }
    }
}
