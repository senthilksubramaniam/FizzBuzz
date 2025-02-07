using InfoTrack.Online.Game.Domain;
using InfoTrack.Online.Game.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace InfoTrack.Online.Game.Application
{
    public class GameService : IGameService
    {
        private readonly AppDbContext _context;

        public GameService(AppDbContext context)
        {
            _context = context;
        }

        public SelectionResponse ValidateQuiz(Quiz quiz)
        {
            return quiz.Validate();
        }

        public async Task<Domain.Game[]> GetGames()
        {
            var games = await _context.Games.ToListAsync();
            return games.ToArray();
        }

        public async Task<Domain.Game> CreateGame(Domain.Game game)
        {
            _context.Games.Add(game);
            await _context.SaveChangesAsync();
            return game;
        }
    }
}
