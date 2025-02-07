using InfoTrack.Online.Game.Domain;

namespace InfoTrack.Online.Game.Application
{
    public interface IGameService
    {
        Task<Domain.Game> CreateGame(Domain.Game game);
        Task<Domain.Game[]> GetGames();
        SelectionResponse ValidateQuiz(Quiz quiz);
    }
}