using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PicHub.Server.Data;

namespace PicHub.IntegrationTests
{
    public class IntegrationTestsFixture : WebApplicationFactory<Program>
    {
        private const string ConnectionString =
            "Server=.;Database=PichubTestDb;Trusted_Connection=True;Encrypt=false;";

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(d =>
                    d.ServiceType == typeof(DbContextOptions<PicHubContext>)
                );
                services.Remove(descriptor);
                services.AddDbContext<PicHubContext>(options =>
                {
                    options.UseSqlServer(ConnectionString);
                });

                var sp = services.BuildServiceProvider();
                using (var scope = sp.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<PicHubContext>();
                    dbContext.Database.EnsureCreated();
                    Utilities.InitializeDatabase(dbContext);
                }
            });
        }
    }
}
