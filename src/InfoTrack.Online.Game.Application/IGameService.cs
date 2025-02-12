using InfoTrack.Online.Game.Domain;

namespace InfoTrack.Online.Game.Application
{
    public interface IGameService
    {
        Task<Domain.DTO.GameDTO> CreateGame(Domain.Game game);
        Task<Domain.DTO.GameDTO[]> GetGames();
        SelectionResponse ValidateQuiz(Quiz quiz);
    }
}