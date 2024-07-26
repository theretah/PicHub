using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace PicHub.Server.Validation
{
    public class ValidationService : IValidationService
    {
        private readonly IConfiguration configuration;
        public ValidationService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IEnumerable<ValidationResult> ValidatePassword(string password)
        {
            var passwordRegexErrorMessagesSection = configuration.GetSection("RegexErrorMessages:Password");

            // Password must be at least 8 characters.
            if (!Regex.IsMatch(password, "^.{8,}$"))
            {
                yield return new ValidationResult(passwordRegexErrorMessagesSection["LengthError"], [nameof(password)]);
            }

            // Password to only contain characters (uppercase letters(A-Z), lowercase letters(a-z), special signs(!@#$%^&*), digits(0-9))
            if (!Regex.IsMatch(password, "^[A-Za-z0-9!@#$%^&*]+$"))
            {

                yield return new ValidationResult(passwordRegexErrorMessagesSection["ContainsIllegalCharacter"], [nameof(password)]);
            }

            // Password cannot start with digits or special characters.
            if (!Regex.IsMatch(password, "^(?![0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]*$"))
            {
                yield return new ValidationResult(passwordRegexErrorMessagesSection["IllegalOrderOfCharacters"], [nameof(password)]);
            }

            // Password must contain at least 1 uppercase(A-Z) character.
            if (!Regex.IsMatch(password, "^(?=.*[A-Z]).*$"))
            {
                yield return new ValidationResult(passwordRegexErrorMessagesSection["LacksUppercase"], [nameof(password)]);
            }

            // Password must contain at least 1 lowercase(a-z) character.
            if (!Regex.IsMatch(password, "^(?=.*[a-z]).*$"))
            {
                yield return new ValidationResult(passwordRegexErrorMessagesSection["LacksLowercase"], [nameof(password)]);
            }

            // Password must contain at least 1 digit(0-9).
            if (!Regex.IsMatch(password, "^(?=.*[0-9]).*$"))
            {
                yield return new ValidationResult(passwordRegexErrorMessagesSection["LacksDigit"], [nameof(password)]);
            }

            // Password must contain at least 1 special character(!@#$%^&*).
            if (!Regex.IsMatch(password, "^(?=.*[!@#$%^&*]).*$"))
            {
                yield return new ValidationResult(passwordRegexErrorMessagesSection["LacksSpecialCharacter"], [nameof(password)]);
            }
        }

        public IEnumerable<ValidationResult> ValidateUserName(string userName)
        {
            var usernameRegexErrorMessagesSection = configuration.GetSection("RegexErrorMessages:UserName");

            // Username to be between 8 and 20 characters
            if (!Regex.IsMatch(userName, "^.{8,20}$"))
            {
                yield return new ValidationResult(usernameRegexErrorMessagesSection["LengthError"], [nameof(userName)]);
            }

            // Username to only contain characters (lowercase letters(a-z), dot(.), underscore(_), digits(0-9))
            if (!Regex.IsMatch(userName, "^[a-z0-9._]+$"))
            {
                yield return new ValidationResult(usernameRegexErrorMessagesSection["ContainsIllegalCharacter"], [nameof(userName)]);
            }
            // Username does not start with digits, dot or underscore. Also doesn't end with dot or underscore.
            if (!Regex.IsMatch(userName, "^(?![0-9._])[a-z0-9._]*(?<![._])$"))
            {
                yield return new ValidationResult(usernameRegexErrorMessagesSection["IllegalOrderOfCharacters"], [nameof(userName)]);
            }
        }
    }
}