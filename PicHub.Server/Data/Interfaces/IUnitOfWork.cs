namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IUnitOfWork : IDisposable
    {
        IChatRepository Chats { get; }
        IMessageRepository Messages { get; }
        IPostRepository Posts { get; }
        ISaveRepository Saves { get; }
        ILikeRepository Likes { get; }
        IFollowRepository Follows { get; }
        int Complete();
    }
}
