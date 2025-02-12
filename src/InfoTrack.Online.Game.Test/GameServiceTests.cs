using FluentAssertions;
using InfoTrack.Online.Game.Application;
using InfoTrack.Online.Game.Domain;
using InfoTrack.Online.Game.Domain.DTO;
using InfoTrack.Online.Game.Infrastructure;
using Moq;
using Xunit;

public class GameServiceTests
{
    private Mock<IAppLogger<GameService>> mockLogger = new Mock<IAppLogger<GameService>>();

    [Fact]
    public void ValidateQuiz_Should_Return_Expected_Response()
    {
        Mock<IGamesRepository> mockGameRepository = new Mock<IGamesRepository>();
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
        var service = new GameService(mockGameRepository.Object, mockLogger.Object);

        // Act
        var response = service.ValidateQuiz(quiz);

        // Assert
        response.Should().NotBeNull();
        response.Score.Should().NotBeNull();
        response.Score.SelectedScore.Should().Be(10);
        response.Score.Bonus.Should().Be(20);
        response.RandomNumber.Should().NotBe(0);
    }

    [Fact]
    public async Task GetGames_Should_Return_All_Games()
    {
        // Arrange
        var createdGame = new GameDTO(1, "FOOBOOLOO", "Author", 130, 100, new List<RuleDTO> { new RuleDTO(2, 10, "FOO") });

        Mock <IGamesRepository> mockGameRepository = new Mock<IGamesRepository>();
        mockGameRepository.Setup(x => x.CreateGame(It.IsAny<Game>())).ReturnsAsync(createdGame);

        var service = new GameService(mockGameRepository.Object, mockLogger.Object);

        // Act
        var games = await service.GetGames();

        // Assert
        games.Should().HaveCount(1);
        games[0].Name.Should().Be("FOOBOOLOO");
        games[0].Author.Should().Be("Author");
        games[0].Range.Should().Be(100);
        games[0].TimeLimit.Should().Be(130);
    }
}
