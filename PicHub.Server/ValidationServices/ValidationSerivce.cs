using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using PicHub.Server.Options;

namespace PicHub.Server.Validation
{
    public class ValidationService : IValidationService
    {
        private readonly IConfiguration Configuration;
        public PasswordRegexErrorMessagesOptions? passwordRegexErrorMessagesOptions
        {
            get;
            private set;
        }
        public UserNameRegexErrorMessagesOptions? userNameRegexErrorMessagesOptions
        {
            get;
            private set;
        }

        public ValidationService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IEnumerable<ValidationResult> ValidatePassword(string password)
        {
            passwordRegexErrorMessagesOptions = new PasswordRegexErrorMessagesOptions();
            Configuration
                .GetSection(PasswordRegexErrorMessagesOptions.Position)
                .Bind(passwordRegexErrorMessagesOptions);

            // Password must be at least 8 characters.
            if (!Regex.IsMatch(password, "^.{8,}$"))
                yield return new ValidationResult(
                    passwordRegexErrorMessagesOptions.LengthError,
                    [nameof(password)]
                );

            // Password to only contain characters (uppercase letters(A-Z), lowercase letters(a-z), special signs(!@#$%^&*), digits(0-9))
            if (!Regex.IsMatch(password, "^[A-Za-z0-9!@#$%^&*]+$"))
                yield return new ValidationResult(
                    passwordRegexErrorMessagesOptions.ContainsIllegalCharacter,
                    [nameof(password)]
                );

            // Password cannot start with digits or special characters.
            if (!Regex.IsMatch(password, "^(?![0-9!@#$%^&*])[A-Za-z0-9!@#$%^&*]*$"))
                yield return new ValidationResult(
                    passwordRegexErrorMessagesOptions.IllegalOrderOfCharacters,
                    [nameof(password)]
                );

            // Password must contain at least 1 uppercase(A-Z) character.
            if (!Regex.IsMatch(password, "^(?=.*[A-Z]).*$"))
                yield return new ValidationResult(
                    passwordRegexErrorMessagesOptions.LacksUppercase,
                    [nameof(password)]
                );

            // Password must contain at least 1 lowercase(a-z) character.
            if (!Regex.IsMatch(password, "^(?=.*[a-z]).*$"))
                yield return new ValidationResult(
                    passwordRegexErrorMessagesOptions.LacksLowercase,
                    [nameof(password)]
                );

            // Password must contain at least 1 digit(0-9).
            if (!Regex.IsMatch(password, "^(?=.*[0-9]).*$"))
                yield return new ValidationResult(
                    passwordRegexErrorMessagesOptions.LacksDigit,
                    [nameof(password)]
                );

            // Password must contain at least 1 special character(!@#$%^&*).
            if (!Regex.IsMatch(password, "^(?=.*[!@#$%^&*]).*$"))
                yield return new ValidationResult(
                    passwordRegexErrorMessagesOptions.LacksSpecialCharacter,
                    [nameof(password)]
                );
        }

        public IEnumerable<ValidationResult> ValidateUserName(string userName)
        {
            userNameRegexErrorMessagesOptions = new UserNameRegexErrorMessagesOptions();
            Configuration
                .GetSection(UserNameRegexErrorMessagesOptions.Position)
                .Bind(userNameRegexErrorMessagesOptions);

            // Username to be between 8 and 20 characters
            if (!Regex.IsMatch(userName, "^.{8,20}$"))
                yield return new ValidationResult(
                    userNameRegexErrorMessagesOptions.LengthError,
                    [nameof(userName)]
                );

            // Username to only contain characters (lowercase letters(a-z), dot(.), underscore(_), digits(0-9))
            if (!Regex.IsMatch(userName, "^[a-z0-9._]+$"))
                yield return new ValidationResult(
                    userNameRegexErrorMessagesOptions.ContainsIllegalCharacter,
                    [nameof(userName)]
                );

            // Username cannot not start with digits, dot or underscore. Also cannot end with dot or underscore.
            if (!Regex.IsMatch(userName, "^(?![0-9._])[a-z0-9._]*(?<![._])$"))
                yield return new ValidationResult(
                    userNameRegexErrorMessagesOptions.IllegalOrderOfCharacters,
                    [nameof(userName)]
                );
        }
    }
}
