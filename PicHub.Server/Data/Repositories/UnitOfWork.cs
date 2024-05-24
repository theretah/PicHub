using CMSReactDotNet.Server.Data;
using CMSReactDotNet.Server.Data.IRepositories;
using PicHub.Server.Data;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PichubContext context;

        public UnitOfWork(PichubContext context)
        {
            this.context = context;
            Posts = new PostRepository(context);
        }

        public IPostRepository Posts { get; private set; }

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
