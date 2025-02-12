using FluentAssertions;
using InfoTrack.Online.Game.DataAccess;
using InfoTrack.Online.Game.Domain;
using InfoTrack.Online.Game.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class GameRepositoryTests
{
    private AppDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString()) // Unique DB per test
            .Options;

        return new AppDbContext(options);
    }   

    [Fact]
    public async Task GetGames_Should_Return_All_Games()
    {
        // Arrange
        using var context = GetDbContext();
        var game = new Game
        {
            Id = 1,
            Name = "FOOBOOLOO",
            Author = "Author",
            Range = 100,
            TimeLimit = 130,
            Rules = new List<Rule> { new Rule { DivisibleBy = 2, Replacement = "FOO", Score = 10 }, new Rule { DivisibleBy = 21, Replacement = "BOO", Score = 20 } }
        };
        context.Games.AddRange(game);
        await context.SaveChangesAsync();

        var service = new GamesRepository(context);

        // Act
        var games = await service.GetGames();

        // Assert
        games.Should().HaveCount(1);
        games[0].Name.Should().Be("FOOBOOLOO");
        games[0].Author.Should().Be("Author");
        games[0].Range.Should().Be(100);
        games[0].TimeLimit.Should().Be(130);
    }

    [Fact]
    public async Task CreateGame_Should_Add_Game_To_Database()
    {
        // Arrange
        using var context = GetDbContext();
        var service = new GamesRepository(context);
        var game = new Game
        {
            Id = 1,
            Name = "FOOBOOLOO",
            Author = "Author",
            Range = 100,
            TimeLimit = 130,
            Rules = new List<Rule> { new Rule { DivisibleBy = 2, Replacement = "FOO", Score = 10 }, new Rule { DivisibleBy = 21, Replacement = "BOO", Score = 20 } }
        }; 

        // Act
        var createdGame = await service.CreateGame(game);
        var savedGame = await context.Games.FindAsync(1);

        // Assert
        createdGame.Should().NotBeNull();
        savedGame.Should().NotBeNull();
        savedGame.Name.Should().Be("FOOBOOLOO");
    }
}
