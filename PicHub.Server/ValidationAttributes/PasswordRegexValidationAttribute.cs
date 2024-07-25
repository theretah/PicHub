using System.ComponentModel.DataAnnotations;
using PicHub.Server.Validation;

namespace PicHub.Server.ValidationAttributes
{
    public class PasswordRegexValidationAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            var validationService = (IValidationService)validationContext.GetService(typeof(IValidationService));
            var password = value as string;

            if (validationService != null && password != null)
            {
                var results = validationService.ValidatePaswword(password);
                if (results != null && results.Any())
                {
                    return results.First();
                }
            }

            return ValidationResult.Success;
        }
    }
}