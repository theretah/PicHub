namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IUnitOfWork : IDisposable
    {
        IPostRepository Posts { get; }
        ISaveRepository Saves { get; }
        ILikeRepository Likes { get; }
        int Complete();
    }
}
