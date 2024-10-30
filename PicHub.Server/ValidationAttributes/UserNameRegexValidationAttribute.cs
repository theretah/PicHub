using System.ComponentModel.DataAnnotations;
using PicHub.Server.Validation;

namespace PicHub.Server.ValidationAttributes
{
    public class UserNameRegexValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(
            object? value,
            ValidationContext validationContext
        )
        {
            var validationService =
                validationContext.GetService(typeof(IValidationService)) as IValidationService;
            var userName = value as string;

            if (validationService != null && userName != null)
            {
                var results = validationService.ValidateUserName(userName);
                if (results != null && results.Any())
                {
                    return results.First();
                }
            }

            return ValidationResult.Success;
        }
    }
}
