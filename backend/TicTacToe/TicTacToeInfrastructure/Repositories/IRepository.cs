﻿using System.Linq.Expressions;

namespace TicTacToeInfrastructure.Repositories
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T? GetByID(Guid id);
        void Insert(T entity);
        void Delete(T entity);
        IEnumerable<T> Find(Expression<Func<T, bool>> predicate);
        void Save();
    }
}
