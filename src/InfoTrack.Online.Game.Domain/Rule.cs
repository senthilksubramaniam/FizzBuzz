﻿namespace InfoTrack.Online.Game.Domain
{
    public record Rule
    {
        public int DivisibleBy { get; set; }
        public int Score { get; set; }
        public string Replacement { get; set; }
    }
}
