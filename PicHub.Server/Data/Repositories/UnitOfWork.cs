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
            Follows = new FollowRepository(context);
            Chats = new ChatRepository(context);
            Messages = new MessageRepository(context);
        }

        public IPostRepository Posts { get; private set; }
        public ISaveRepository Saves { get; private set; }
        public ILikeRepository Likes { get; private set; }
        public IFollowRepository Follows { get; private set; }
        public IChatRepository Chats { get; private set; }
        public IMessageRepository Messages { get; private set; }

        public async Task<int> CompleteAsync()
        {
            return await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
