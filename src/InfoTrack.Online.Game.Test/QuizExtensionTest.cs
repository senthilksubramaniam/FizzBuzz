using Xunit;
using FluentAssertions;
using InfoTrack.Online.Game.Domain;
using InfoTrack.Online.Game.Application;

public class QuizExtensionTests
{
    [Fact]
    public void Validate_Returns_NewRandomNumber_When_Selection_Is_Null()
    {
        // Arrange
        var quiz = new Quiz
        {
            Game = new Game { Range = 10, Rules = new List<Rule>() },
            Selection = null
        };

        // Act
        var result = quiz.Validate();

        // Assert
        result.RandomNumber.Should().BeInRange(1, quiz.Game.Range);
        result.Score.Should().BeNull();
    }

    [Fact]
    public void Validate_Returns_CorrectScore_When_Selection_Matches_Rules()
    {
        // Arrange
        var quiz = new Quiz
        {
            RandomNumber = 6,
            Selection = 3,
            Game = new Game
            {
                Range = 10,
                Rules = new List<Rule>
                {
                    new Rule { DivisibleBy = 3, Score = 10 },
                    new Rule { DivisibleBy = 2, Score = 5 }
                }
            }
        };

        // Act
        var result = quiz.Validate();

        // Assert
        result.RandomNumber.Should().BeInRange(1, quiz.Game.Range);
        result.Score.Should().NotBeNull();
        result.Score.SelectedScore.Should().Be(10);
        result.Score.Bonus.Should().Be(5);
    }

    [Fact]
    public void Validate_Returns_ZeroScore_When_No_Rules_Are_Matched()
    {
        // Arrange
        var quiz = new Quiz
        {
            RandomNumber = 7,
            Selection = 4,
            Game = new Game
            {
                Range = 10,
                Rules = new List<Rule>
                {
                    new Rule { DivisibleBy = 3, Score = 10 },
                    new Rule { DivisibleBy = 2, Score = 5 }
                }
            }
        };

        // Act
        var result = quiz.Validate();

        // Assert
        result.RandomNumber.Should().BeInRange(1, quiz.Game.Range);
        result.Score.Should().NotBeNull();
        result.Score.SelectedScore.Should().Be(0);
        result.Score.Bonus.Should().Be(0);
    }

    [Fact]
    public void Validate_CorrectlyCalculates_BonusScore()
    {
        // Arrange
        var quiz = new Quiz
        {
            RandomNumber = 12,
            Selection = 2,
            Game = new Game
            {
                Range = 20,
                Rules = new List<Rule>
                {
                    new Rule { DivisibleBy = 2, Score = 10 },
                    new Rule { DivisibleBy = 3, Score = 15 }
                }
            }
        };

        // Act
        var result = quiz.Validate();

        // Assert
        result.RandomNumber.Should().BeInRange(1, quiz.Game.Range);
        result.Score.Should().NotBeNull();
        result.Score.SelectedScore.Should().Be(10);
        result.Score.Bonus.Should().Be(15);
    }
}
