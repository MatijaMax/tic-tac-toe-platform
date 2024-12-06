using Microsoft.EntityFrameworkCore;
using TicTacToeCore.Domain;
using System.Reflection;

namespace TicTacToeInfrastructure
{
    public class TicTacToeContext : DbContext
    {
        public TicTacToeContext(DbContextOptions<TicTacToeContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<GameRecord> GameRecords { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }




    }
}
