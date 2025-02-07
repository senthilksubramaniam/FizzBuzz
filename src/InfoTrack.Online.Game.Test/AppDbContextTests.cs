using FluentAssertions;
using InfoTrack.Online.Game.Domain;
using InfoTrack.Online.Game.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Xunit;

public class AppDbContextTests
{
    private AppDbContext GetDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    
    [Fact]
    public async Task Can_Insert_And_Retrieve_Game_With_Jsonb_Rules()
    {
        // Arrange
        using var context = GetDbContext();
        var rules = new List<Rule>
        {
            new Rule { DivisibleBy = 2, Score = 5 },
            new Rule { DivisibleBy = 3, Score = 10 }
        };

        var game = new Game { Id = 1, Name = "Chess", Rules = rules };

        // Act
        context.Games.Add(game);
        await context.SaveChangesAsync();
        var retrievedGame = await context.Games.FindAsync(1);

        // Assert
        retrievedGame.Should().NotBeNull();
        retrievedGame.Rules.Should().BeEquivalentTo(rules);
    }
}
