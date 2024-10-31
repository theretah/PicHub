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
            Blocks = new BlockRepository(context);

            PrivateChats = new PrivateChatRepository(context);
            GroupChats = new GroupChatRepository(context);
            ChatLines = new ChatLineRepository(context);
            Seens = new SeenRepository(context);
            GroupChatUsers = new GroupChatUserRepository(context);
        }

        public IPostRepository Posts { get; private set; }
        public ISaveRepository Saves { get; private set; }
        public ILikeRepository Likes { get; private set; }

        public IFollowRepository Follows { get; private set; }
        public IBlockRepository Blocks { get; private set; }

        public IPrivateChatRepository PrivateChats { get; private set; }
        public IGroupChatRepository GroupChats { get; private set; }
        public IChatLineRepository ChatLines { get; private set; }
        public ISeenRepository Seens { get; private set; }

        public IGroupChatUserRepository GroupChatUsers { get; private set; }

        public int Complete()
        {
            return context.SaveChanges();
        }

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
