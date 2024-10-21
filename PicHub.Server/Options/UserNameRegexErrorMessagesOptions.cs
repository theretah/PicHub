namespace PicHub.Server.Options
{
    public class UserNameRegexErrorMessagesOptions
    {
        public const string Position = "RegexErrorMessages:UserName";

        public string LengthError { get; set; } = string.Empty;
        public string ContainsIllegalCharacter { get; set; } = string.Empty;
        public string IllegalOrderOfCharacters { get; set; } = string.Empty;
    }
}
