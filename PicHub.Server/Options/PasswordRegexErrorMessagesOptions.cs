namespace PicHub.Server.Options
{
    public class PasswordRegexErrorMessagesOptions
    {
        public const string Position = "RegexErrorMessages:Password";

        public string LengthError { get; set; } = string.Empty;
        public string ContainsIllegalCharacter { get; set; } = string.Empty;
        public string IllegalOrderOfCharacters { get; set; } = string.Empty;
        public string LacksUppercase { get; set; } = string.Empty;
        public string LacksLowercase { get; set; } = string.Empty;
        public string LacksDigit { get; set; } = string.Empty;
        public string LacksSpecialCharacter { get; set; } = string.Empty;
    }
}
