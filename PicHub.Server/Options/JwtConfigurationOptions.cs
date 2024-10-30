namespace PicHub.Server.Options
{
    public class JwtConfigurationOptions : ConfigOptionsBase
    {
        public JwtConfigurationOptions(IConfiguration configuration)
            : base(configuration) { }

        public override string SectionName { get; init; } = "JwtConfig";

        public string Secret { get; set; } = string.Empty;
        public string ValidIssuer { get; set; } = string.Empty;
        public string ValidAudiences { get; set; } = string.Empty;
    }
}
