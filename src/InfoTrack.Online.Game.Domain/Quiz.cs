namespace InfoTrack.Online.Game.Domain
{
    public class Quiz
    {
        public Game Game { get; set; } = new Game();
        public int? Selection { get; set; }
        public int? RandomNumber { get; set; }
    }
}
