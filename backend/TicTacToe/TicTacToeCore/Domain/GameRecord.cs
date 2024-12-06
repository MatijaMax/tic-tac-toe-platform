using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToeCore.Domain
{
    public class GameRecord
    {
        public Guid Id { get; set; }
        public string Player1 { get; set; } = string.Empty;
        public string Player2 { get; set; } = string.Empty;
        public string Winner { get; set; } = string.Empty;
        public int WinPoints { get; set; }
        public int LossPoints { get; set; }
    }
}
