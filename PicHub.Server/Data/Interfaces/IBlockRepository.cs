using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IBlockRepository : IRepository<Block>
    {
        void Update(Block block);
    }
}
