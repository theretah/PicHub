﻿using CMSReactDotNet.Server.Data.IRepositories;
using CMSReactDotNet.Server.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using PicHub.Server.Data;

namespace CMSReactDotNet.Server.Data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PicHubContext context;

        public UnitOfWork(PicHubContext context)
        {
            this.context = context;

            AppUsers = new AppUserRepository(context);

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

            AccountCategoryRepository = new AccountCategoryRepository(context);
            ProfessionalCategoryRepository = new ProfessionalCategoryRepository(context);
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

        public IAccountCategoryRepository AccountCategoryRepository { get; private set; }

        public IProfessionalCategoryRepository ProfessionalCategoryRepository { get; private set; }

        public IAppUserRepository AppUsers { get; private set; }

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

        public bool EnsureCreated()
        {
            return context.Database.EnsureCreated();
        }

        public bool EnsureDeleted()
        {
            return context.Database.EnsureDeleted();
        }
    }
}
