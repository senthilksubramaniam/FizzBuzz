using InfoTrack.Online.Game.Domain.DTO;
using InfoTrack.Online.Game.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace InfoTrack.Online.Game.DataAccess
{
    public class GamesRepository : IGamesRepository
    {
        private readonly AppDbContext _context;

        public GamesRepository(AppDbContext context)
        {
            _context = context;
        }
        
        public async Task<GameDTO> CreateGame(Domain.Game game) {
            _context.Games.Add(game);
            await _context.SaveChangesAsync();
            var rulesDTO = game.Rules.Select(rule => new RuleDTO(rule.DivisibleBy, rule.Score, rule.Replacement));  
            return  new GameDTO( game.Id,game.Name, game.Author,game.TimeLimit,game.Range, rulesDTO.ToList());

        }

        public async Task<GameDTO[]> GetGames() {

            var games = await _context.Games.ToListAsync();
            if (games.Any())
            {
                var gamesDTO = games.Select(game =>
                {
                    var rulesDTO = game.Rules.Select(rule => new RuleDTO(rule.DivisibleBy, rule.Score, rule.Replacement));
                    return new GameDTO(game.Id, game.Name, game.Author,game.TimeLimit, game.Range, rulesDTO.ToList());
                 });
                return gamesDTO.ToArray();
            }
            return [];
        }
    }
}
