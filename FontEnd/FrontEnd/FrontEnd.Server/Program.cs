using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

// CORS so the React dev server can talk to the API during development
const string CorsPolicy = "AllowFrontend";
builder.Services.AddCors(opt =>
{
    opt.AddPolicy(CorsPolicy, p =>
        p.WithOrigins("http://localhost:5173", "https://localhost:5173")
         .AllowAnyHeader()
         .AllowAnyMethod()
         .AllowCredentials());
});

builder.Services.AddControllers();
builder.Services.Configure<JsonOptions>(o =>
{
    o.SerializerOptions.PropertyNamingPolicy = null; // keep C# style names if you prefer
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseCors(CorsPolicy);
app.MapControllers();

app.Run();
