using Microsoft.Extensions.Options;

namespace PicHub.Server.Options
{
    public class DatabaseOptionsSetup : IConfigureOptions<DatabaseOptions>
    {
        private readonly IConfiguration configuration;
        private const string ConfigurationSectionName = "DatabaseOptions";

        public DatabaseOptionsSetup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void Configure(DatabaseOptions options)
        {
            var connectionString = configuration.GetConnectionString("SqlServerConnection");

            options.ConnectionString = connectionString;

            configuration.GetSection(ConfigurationSectionName).Bind(options);
        }
    }
}
