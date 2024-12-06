using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TicTacToeCore.Domain
{
    public class User
    {
        public Guid Id {  get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Username {  get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int Points { get; set; }
        public int Streak {  get; set; }
        public bool InQueue { get; set; } = false;

    }
}
