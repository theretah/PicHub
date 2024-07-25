

using System.ComponentModel.DataAnnotations;

namespace PicHub.Server.Validation
{
    public interface IValidationService
    {
        IEnumerable<ValidationResult> ValidateUserName(string userName);
        IEnumerable<ValidationResult> ValidatePaswword(string password);
    }
}