using InfoTrack.Online.Game.Application;
using InfoTrack.Online.Game.Infrastructure;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using InfoTrack.Online.Game.DataAccess;

public class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        Env.Load();

        builder.Configuration
        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
        .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
        .AddJsonFile("appsettings.Custom.json", optional: true, reloadOnChange: true)
        .AddEnvironmentVariables();

        var connectionString = builder.Configuration.GetConnectionString("InfoTrack");
        connectionString = connectionString!.Replace("host", (Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost"));

        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(connectionString)
        );

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend",
                policy => policy.WithOrigins("http://localhost:5173")
                                .AllowAnyMethod()
                                .AllowAnyHeader());
        });

        builder.Services.AddScoped(typeof(IAppLogger<>), typeof(AppLogger<>));
        builder.Services.AddLogging(config =>
        {
            config.AddConsole();
        });
        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddTransient<IGameService, GameService>();
        builder.Services.AddTransient<IGamesRepository, GamesRepository>();

        var app = builder.Build();

        app.UseCors("AllowFrontend");

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}