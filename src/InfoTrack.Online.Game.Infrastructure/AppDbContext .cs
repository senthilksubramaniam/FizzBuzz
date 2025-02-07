using InfoTrack.Online.Game.Domain;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace InfoTrack.Online.Game.Infrastructure
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Parameterless constructor for EF Core tools
        public AppDbContext() { }

        public DbSet<InfoTrack.Online.Game.Domain.Game> Games { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InfoTrack.Online.Game.Domain.Game>().ToTable("games");

            modelBuilder.Entity<InfoTrack.Online.Game.Domain.Game>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Author).HasColumnName("author");
                entity.Property(e => e.TimeLimit).HasColumnName("time_limit");
                entity.Property(e => e.Range).HasColumnName("range");
                entity.Property(e => e.Rules)
                    .HasColumnName("rules")
                    .HasColumnType("jsonb")
                    .HasConversion(
                        v => JsonSerializer.Serialize(v, new JsonSerializerOptions { }),
                        v => JsonSerializer.Deserialize<List<Rule>>(v, new JsonSerializerOptions { }) ?? new List<Rule>()
                    );
            });
        }
    }
}
