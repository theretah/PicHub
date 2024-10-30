using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using PicHub.Server.Options;

namespace PicHub.Server.Validation
{
    public class ValidationService : IValidationService
    {
        private readonly IConfiguration Configuration;
        public PasswordRegexErrorMessagesOptions? passwordErrorsConfig { get; private set; }
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
            passwordErrorsConfig = new PasswordRegexErrorMessagesOptions(Configuration);

            // Password must be at least 8 characters.
            if (!Regex.IsMatch(password, "^.{8,}$"))
                yield return new ValidationResult(
                    passwordErrorsConfig.LengthError,
                    [nameof(password)]
                );

            // Password to only contain characters (uppercase letters(A-Z), lowercase letters(a-z), special signs(!@#$%^&*), digits(0-9))
            if (!Regex.IsMatch(password, @"^[A-Za-z0-9!@#$%^&*(){}\[\];:'"",.+=\-`~?\/\\_|]+$"))
                yield return new ValidationResult(
                    passwordErrorsConfig.ContainsIllegalCharacter,
                    [nameof(password)]
                );

            // Password can only be started with lowecase or uppercase English characters
            if (
                !Regex.IsMatch(
                    password,
                    @"^[A-Za-z][A-Za-z0-9!@#$%^&*(){}\[\];:'"",.+=\-`~?\/\\_|]*$"
                )
            )
                yield return new ValidationResult(
                    passwordErrorsConfig.IllegalOrderOfCharacters,
                    [nameof(password)]
                );

            // Password must contain at least 1 uppercase(A-Z) character.
            if (!Regex.IsMatch(password, "^(?=.*[A-Z]).*$"))
                yield return new ValidationResult(
                    passwordErrorsConfig.LacksUppercase,
                    [nameof(password)]
                );

            // Password must contain at least 1 lowercase(a-z) character.
            if (!Regex.IsMatch(password, "^(?=.*[a-z]).*$"))
                yield return new ValidationResult(
                    passwordErrorsConfig.LacksLowercase,
                    [nameof(password)]
                );

            // Password must contain at least 1 digit(0-9).
            if (!Regex.IsMatch(password, "^(?=.*[0-9]).*$"))
                yield return new ValidationResult(
                    passwordErrorsConfig.LacksDigit,
                    [nameof(password)]
                );

            // Password must contain at least 1 special character such as: !@#$%^&*(){}[];:'",.+=-~?/\_|.
            if (!Regex.IsMatch(password, @"^(?=.*[!@#$%^&*(){}\[\];:'"",.+=\-`~?\/\\_|]).+$"))
                yield return new ValidationResult(
                    passwordErrorsConfig.LacksSpecialCharacter,
                    [nameof(password)]
                );
        }

        public IEnumerable<ValidationResult> ValidateUserName(string userName)
        {
            userNameRegexErrorMessagesOptions = new UserNameRegexErrorMessagesOptions(
                Configuration
            );

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
