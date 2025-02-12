using InfoTrack.Online.Game.Domain;
using InfoTrack.Online.Game.Infrastructure;

namespace InfoTrack.Online.Game.Application
{
    public class GameService : IGameService
    {
        private readonly IGamesRepository _gamesRepository;
        private readonly IAppLogger<GameService> _logger;

        public GameService(IGamesRepository gamesRepository, IAppLogger<GameService> logger)
        {
            _gamesRepository = gamesRepository;
            _logger = logger;
        }

        public SelectionResponse ValidateQuiz(Quiz quiz)
        {
            try
            {
                return quiz.Validate();
            }
            catch (Exception ex)
            {
                _logger.LogError("Unable to validate the Quiz", ex);
                throw;
            }
        }

        public async Task<Domain.DTO.GameDTO[]> GetGames()
        {
            try
            {
                var games = await _gamesRepository.GetGames();
                return games.ToArray();
            }
            catch (Exception ex)
            {
                _logger.LogError("Unable to fetch all games", ex);
                throw;
            }
        }

        public async Task<Domain.DTO.GameDTO> CreateGame(Domain.Game game)
        {
            try
            {
                var gameDto = await _gamesRepository.CreateGame(game);
                return gameDto;
            }
            catch (Exception ex)
            {
                _logger.LogError("Unable to create games", ex);
                throw;
            }
        }
    }
}
