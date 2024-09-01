using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace PicHub.IntegrationTests
{
    public static class Utilities
    {
        private static void SeedDatabase(PicHubContext context)
        {
            context.Posts.Add(
                new Post
                {
                    AuthorId = "1",
                    PhotoContent = null,
                    Caption = "",
                    CommentsAllowed = true,
                    CreateDate = DateTime.Now,
                }
            );
            context.SaveChanges();
        }

        public static void InitializeDatabase(PicHubContext context)
        {
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();
            SeedDatabase(context);
        }

        public static void Cleanup(PicHubContext context)
        {
            context.Posts.ExecuteDelete();
            context.SaveChanges();
            SeedDatabase(context);
        }
    }
}
