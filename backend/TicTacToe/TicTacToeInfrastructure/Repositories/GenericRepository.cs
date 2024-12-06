using System.Linq.Expressions;
using TicTacToeInfrastructure;

namespace TicTacToeInfrastructure.Repositories
{
    public class GenericRepository<T> : IRepository<T> where T : class
    {
        protected readonly TicTacToeContext context;

        public GenericRepository(TicTacToeContext context)
        {
            this.context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public virtual IEnumerable<T> GetAll()
        {
            return context.Set<T>().ToList();
        }

        public T? GetByID(Guid id)
        {
            return context.Set<T>().Find(id);
        }

        public void Insert(T entity)
        {
            context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            context.Set<T>().Remove(entity);
        }

        public IEnumerable<T> Find(Expression<Func<T, bool>> predicate)
        {
            return context.Set<T>().Where(predicate);
        }
        public void Save()
        {
            context.SaveChanges();
        }

    }
}
