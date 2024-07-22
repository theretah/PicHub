using System.Linq.Expressions;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IRepository<T> where T : class
    {
        Task<bool> ExistsAsync(int id);
        Task<bool> ExistsByPredicateAsync(Expression<Func<T, bool>> predicate);

        Task<T> GetByIdAsync(int id);
        Task<T> GetByPredicateAsync(Expression<Func<T, bool>> predicate);

        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> FindByPredicateAsync(Expression<Func<T, bool>> predicate);

        Task AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);

        Task RemoveByIdAsync(int id);
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);
    }
}
