using CMSReactDotNet.Server.Data;
using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;
using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PicHubContext context;

        public UnitOfWork(PicHubContext context)
        {
            this.context = context;
            Posts = new PostRepository(context);
            Saves = new SaveRepository(context);
            Likes = new LikeRepository(context);
        }

        public IPostRepository Posts { get; private set; }

        public ISaveRepository Saves { get; private set; }

        public ILikeRepository Likes { get; private set; }

        public int Complete()
        {
            return context.SaveChanges();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
