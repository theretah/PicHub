namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IUnitOfWork : IDisposable
    {
        IPostRepository Posts { get; }
        ISaveRepository Saves { get; }
        ILikeRepository Likes { get; }

        IFollowRepository Follows { get; }
        IBlockRepository Blocks { get; }

        IChatLineRepository ChatLines { get; }
        IPrivateChatRepository PrivateChats { get; }
        IGroupChatRepository GroupChats { get; }
        IGroupChatUserRepository GroupChatUsers { get; }

        ISeenRepository Seens { get; }

        Task<int> CompleteAsync();
    }
}
