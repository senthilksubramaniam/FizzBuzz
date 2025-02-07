using InfoTrack.Online.Game.Application;
using InfoTrack.Online.Game.Domain;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class GamesController : ControllerBase
{
    private readonly IGameService _gameService;

    public GamesController(IGameService gameService)
    {
        _gameService = gameService;
    }

    [HttpGet]
    public async Task<IActionResult> GetGames()
    {
        return Ok(await _gameService.GetGames());
    }

    [HttpPost]
    public async Task<IActionResult> CreateGame([FromBody] Game game)
    {
        await _gameService.CreateGame(game);
        return CreatedAtAction(nameof(CreateGame), new { id = game.Id }, game);
    }

    [HttpPost ("play")]
    public IActionResult PlayGame([FromBody] Quiz quiz)
    {
        var response =  _gameService.ValidateQuiz(quiz);
        return Ok (response);
    }
}
