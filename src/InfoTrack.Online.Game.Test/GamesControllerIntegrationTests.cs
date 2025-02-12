using System.Net;
using System.Net.Http.Json;
using FluentAssertions;
using InfoTrack.Online.Game.Application;
using InfoTrack.Online.Game.Domain;
using InfoTrack.Online.Game.Domain.DTO;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Xunit;

public class GamesControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly Mock<IGameService> _mockGameService;

    public GamesControllerIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _mockGameService = new Mock<IGameService>();

        // Create a test server 
        _client = factory.WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            { 
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(IGameService));
                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }
                services.AddSingleton(_mockGameService.Object);
            });
        }).CreateClient();
    }

    [Fact]
    public async Task GetGames_ReturnsOk_WithMockedGames()
    {
        // Arrrange
        var games = new GameDTO[] { new GameDTO(1, "FOOBOOLOO", "Author", 130, 100, new List<RuleDTO> { new RuleDTO(2, 10, "FOO") }) };

        _mockGameService.Setup(s => s.GetGames()).ReturnsAsync(games);

        // Act
        var response = await _client.GetAsync("/api/games");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var returnedGames = await response.Content.ReadFromJsonAsync<List<Game>>();
        returnedGames.Should().HaveCount(1);
        returnedGames[0].Name.Should().Be("FOOBOOLOO");
        returnedGames[0].Id.Should().Be(1);
        returnedGames[0].Author.Should().Be("Author");
        returnedGames[0].Range.Should().Be(100);
        returnedGames[0].Rules.Should().HaveCount(1);
    }

    [Fact]
    public async Task GetGame_ReturnsEmpty_IfGameDoesNotExist()
    {
        // Arrange
        _mockGameService.Setup(s => s.GetGames()).ReturnsAsync([]);

        // Act
        var response = await _client.GetAsync("/api/games");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var returnedGames = await response.Content.ReadFromJsonAsync<List<Game>>();
        returnedGames.Should().HaveCount(0);
    }

    [Fact]
    public async Task CreateGame_ReturnsCreatedAtAction()
    {
        // Arrange
        var newGame = new Game
        {
            Id = 1,
            Name = "FOOBOOLOO",
            Author = "Author",
            Range = 100,
            TimeLimit = 130,
            Rules = new List<Rule> { new Rule { DivisibleBy=2,Score= 10,Replacement= "FOO" } }
        };
        var createdGame = new GameDTO(1, "FOOBOOLOO", "Author", 130, 100, new List<RuleDTO> { new RuleDTO(2, 10, "FOO") }
);
        _mockGameService.Setup(s => s.CreateGame(It.IsAny<Game>())).ReturnsAsync(createdGame);

        // Act
        var response = await _client.PostAsJsonAsync("/api/games", newGame);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Created);
    }

    [Fact]
    public async Task PlayGame_ReturnsCreatedAtAction_WithQuizResponse()
    {
        // Arrange

        var game = new Game
        {
            Id = 1,
            Name = "FOOBOOLOO",
            Author = "Author",
            Range = 100,
            TimeLimit = 130,
            Rules = new List<Rule> { new Rule { DivisibleBy = 2, Replacement = "FOO", Score = 10 }, new Rule { DivisibleBy = 21, Replacement = "BOO", Score = 20 } }
        };
        var quiz = new Quiz { Game = game, RandomNumber = 42, Selection = 2 };
        var expectedResponse = new SelectionResponse { RandomNumber = 101, Score = new Score { Bonus = 20, SelectedScore = 10 } };
        _mockGameService.Setup(s => s.ValidateQuiz(It.IsAny<Quiz>())).Returns(expectedResponse);

        // Act
        var response = await _client.PostAsJsonAsync("/api/games/play", quiz);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        var quizResponse = await response.Content.ReadFromJsonAsync<SelectionResponse>();
        quizResponse.Should().NotBeNull();
        quizResponse.Score.Should().NotBeNull();
        quizResponse.Score.SelectedScore.Should().Be(10);
        quizResponse.Score.Bonus.Should().Be(20);
        quizResponse.RandomNumber.Should().NotBe(0);
    }
}
