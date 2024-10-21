namespace PicHub.Server.Options
{
    public class JwtConfigurationOptions
    {
        public const string Position = "JwtConfig";

        public string Secret { get; set; } = string.Empty;
        public string ValidIssuer { get; set; } = string.Empty;
        public string ValidAudiences { get; set; } = string.Empty;
    }
}
