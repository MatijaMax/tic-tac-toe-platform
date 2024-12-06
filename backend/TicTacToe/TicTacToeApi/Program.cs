using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using System.Text.Json.Serialization;
using TicTacToeInfrastructure;
using TicTacToeCore.Domain;
using TicTacToeInfrastructure.Repositories;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using NSwag;
using NSwag.Generation.Processors.Security;
using TicTacToeAPI.Game;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSignalR();
builder.Services.AddTransient<GameService>();

// Configuration
builder.Configuration.AddJsonFile("appsettings.json");
var configuration = builder.Configuration;

//Configure CORS middleware
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost4200", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod()
        .AllowCredentials();
    });
});

// Configure JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]))
        };
    });

builder.Services.AddSingleton<JwtTokenService>(); 

builder.Services.AddOpenApiDocument(cfg =>
{
    // Define the security scheme for JWT Bearer
    cfg.AddSecurity("Bearer", new OpenApiSecurityScheme
    {
        Type = OpenApiSecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = OpenApiSecurityApiKeyLocation.Header,
        Description = "Enter your JWT token"
    });

    // Add security requirements to the document (make the Bearer token required)
    cfg.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("Bearer"));
});

// Add services to the container.
builder.Services.AddDbContext<TicTacToeContext>(options =>
{
    options.UseNpgsql(configuration.GetConnectionString("TicTacToeConnection"));
});

// Configure MediatR
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly);
});

// Initialize repositories
builder.Services.AddTransient<IRepository<User>, GenericRepository<User>>();
builder.Services.AddTransient<IRepository<GameRecord>, GenericRepository<GameRecord>>();

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });


//Build the app
var app = builder.Build();
app.UseCors("AllowLocalhost4200");
app.MapHub<GameHub>("/gamehub");


// Configure OpenApi/Swagger/JWT/
app.UseOpenApi();
app.UseSwaggerUi3(); 
app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.MapControllers();
app.Run();
