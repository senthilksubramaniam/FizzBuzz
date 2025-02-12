namespace InfoTrack.Online.Game.Domain.DTO
{
    public record GameDTO (int Id, string Name, string Author, int TimeLimit, int Range, List<RuleDTO> Rules);
}
