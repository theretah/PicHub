using System.Linq.Expressions;
using CMSReactDotNet.Server.Data.IRepositories;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CMSReactDotNet.Server.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly IdentityDbContext Context;
        private readonly DbSet<T> set;

        public Repository(IdentityDbContext context)
        {
            Context = context;
            set = context.Set<T>();
        }

        public async Task AddAsync(T entity)
        {
            await set.AddAsync(entity);
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await set.AddRangeAsync(entities);
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await set.FindAsync(id) != null;
        }

        public async Task<IEnumerable<T>> FindByPredicateAsync(Expression<Func<T, bool>> predicate)
        {
            return await set.Where(predicate).ToListAsync();
        }
        public async Task<T> GetByPredicateAsync(Expression<Func<T, bool>> predicate)
        {
            return await set.Where(predicate).SingleOrDefaultAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await set.FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await set.ToListAsync();
        }

        public void Remove(T entity)
        {
            set.Remove(entity);
        }

        public async Task RemoveByIdAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            set.Remove(entity);
        }

        public void RemoveRange(IEnumerable<T> entities)
        {
            set.RemoveRange(entities);
        }

        public async Task<bool> ExistsByPredicateAsync(Expression<Func<T, bool>> predicate)
        {
            var entity = await set.Where(predicate).SingleOrDefaultAsync();
            return entity != null;
        }
    }
}
