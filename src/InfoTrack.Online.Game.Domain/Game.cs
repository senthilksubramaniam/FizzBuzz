using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InfoTrack.Online.Game.Domain
{
    public class Game
    {
        [Key] // Primary Key
        public int Id { get; set; }

        [Required] // NOT NULL
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Author { get; set; } = string.Empty;

        [Required]
        public int TimeLimit { get; set; }

        [Required]
        public int Range { get; set; }

        [Required]
        [Column(TypeName = "jsonb")]
        public List<Rule> Rules { get; set; } = new();
    }

}
