using System.ComponentModel.DataAnnotations;
using PicHub.Server.Validation;

namespace PicHub.Server.ValidationAttributes
{
    public class PasswordRegexValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(
            object? value,
            ValidationContext validationContext
        )
        {
            var validationService =
                validationContext.GetService(typeof(IValidationService)) as IValidationService;
            var password = value as string;

            if (validationService != null && password != null)
            {
                var results = validationService.ValidatePassword(password);
                if (results != null && results.Any())
                {
                    return results.First();
                }
            }

            return ValidationResult.Success;
        }
    }
}
