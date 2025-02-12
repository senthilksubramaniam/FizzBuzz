namespace InfoTrack.Online.Game.Infrastructure
{
    public interface IGamesRepository
    {
        Task<Domain.DTO.GameDTO> CreateGame(Domain.Game game);
        Task<Domain.DTO.GameDTO[]> GetGames();
    }
}
