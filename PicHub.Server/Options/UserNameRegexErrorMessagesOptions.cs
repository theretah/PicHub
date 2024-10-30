namespace PicHub.Server.Options
{
    public class UserNameRegexErrorMessagesOptions : ConfigOptionsBase
    {
        public UserNameRegexErrorMessagesOptions(IConfiguration configuration)
            : base(configuration) { }

        public override string SectionName { get; init; } = "RegexErrorMessages:UserName";

        public string LengthError { get; set; } = string.Empty;
        public string ContainsIllegalCharacter { get; set; } = string.Empty;
        public string IllegalOrderOfCharacters { get; set; } = string.Empty;
    }
}
