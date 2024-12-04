using System.Linq.Expressions;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IRepository<T>
        where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<T> GetByIdAsync(string id);
        Task<T> GetByPredicateAsync(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllByPredicateAsync(Expression<Func<T, bool>> predicate);
        Task<bool> ExistsAsync(int id);
        Task<bool> ExistsAsync(string id);
        Task<bool> ExistsByPredicateAsync(Expression<Func<T, bool>> predicate);

        Task AddAsync(T entity);
        Task AddRangeAsync(IEnumerable<T> entities);
        Task AddRangeAsync(params T[] entities);

        Task RemoveByIdAsync(int id);
        Task RemoveByIdAsync(string id);
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);
        int ExecuteDelete();
    }
}
