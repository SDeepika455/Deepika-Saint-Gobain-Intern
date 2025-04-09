var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:5000"); // Force it to use port 5000
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});
var app = builder.Build();
app.UseCors("AllowAngularApp");
app.MapControllers();
app.Run();
