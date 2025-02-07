using InfoTrack.Online.Game.Domain;

namespace InfoTrack.Online.Game.Application
{
    public static class QuizExtension
    {
        public static SelectionResponse Validate(this Quiz quiz)
        {
            var random = new Random();
            var newRandomNumber = random.Next(1, quiz.Game.Range + 1);

            if (quiz.Selection == null)
            {
                return new SelectionResponse { RandomNumber = newRandomNumber, Score = null };
            }

            var score = 0;
            var bonus = 0;

            foreach (var rule in quiz.Game.Rules)
            {
                if (quiz.RandomNumber % quiz.Selection == 0 && quiz.RandomNumber % rule.DivisibleBy == 0)
                {
                    if (quiz.Selection == rule.DivisibleBy)
                    {
                        score += rule.Score;
                    }
                    else
                    {
                        bonus += rule.Score;
                    }
                }
            }
            return new SelectionResponse { RandomNumber = newRandomNumber, Score = new Score { SelectedScore = score, Bonus = bonus } };
        }
    }
}
