using CMSReactDotNet.Server.Data.IRepositories;

namespace CMSReactDotNet.Server.Data.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IAppUserRepository AppUsers { get; }

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

        IAccountCategoryRepository AccountCategoryRepository { get; }
        IProfessionalCategoryRepository ProfessionalCategoryRepository { get; }

        Task<int> CompleteAsync();
        int Complete();
        bool EnsureCreated();
        bool EnsureDeleted();
    }
}
