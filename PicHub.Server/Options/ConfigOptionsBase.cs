namespace PicHub.Server.Options
{
    public abstract class ConfigOptionsBase
    {
        public abstract string SectionName { get; init; }

        public ConfigOptionsBase(IConfiguration configuration)
        {
            configuration.GetSection(SectionName).Bind(this);
        }
    }
}
