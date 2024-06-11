using System.Linq.Expressions;

namespace CMSReactDotNet.Server.Data.IRepositories
{
    public interface IRepository<T> where T : class
    {
        bool Exists(int id);
        T Get(int id);
        IEnumerable<T> GetAll();
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate);

        void Add(T entity);
        void AddRange(IEnumerable<T> entities);

        void Remove(int id);
        void Remove(T entity);
        void RemoveRange(IEnumerable<T> entities);
    }
}
