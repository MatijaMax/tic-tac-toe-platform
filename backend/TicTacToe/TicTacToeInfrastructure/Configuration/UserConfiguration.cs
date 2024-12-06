using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using TicTacToeCore.Domain;

namespace TicTacToeInfrastructure.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Username)
                .IsRequired()
                .HasMaxLength(255);
            builder.Property(u => u.Password)
                .IsRequired()
                .HasMaxLength(255);
        }
    }
}
