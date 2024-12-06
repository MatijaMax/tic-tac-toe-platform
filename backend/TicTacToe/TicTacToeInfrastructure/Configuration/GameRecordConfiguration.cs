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
    public class GameRecordConfiguration : IEntityTypeConfiguration<GameRecord>
    {
        public void Configure(EntityTypeBuilder<GameRecord> builder)
        {
            builder.HasKey(gr => gr.Id); 
        }
    }
}
