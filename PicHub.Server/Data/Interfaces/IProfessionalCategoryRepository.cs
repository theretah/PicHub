using PicHub.Server.Entities;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IProfessionalCategoryRepository : IRepository<ProfessionalCategory>
    {
        void Update(ProfessionalCategory professionalCategory);
    }
}
