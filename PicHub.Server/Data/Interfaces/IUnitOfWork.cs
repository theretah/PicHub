namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IUnitOfWork : IDisposable
    {
        IPostRepository Posts { get; }
        int Complete();
    }
}
