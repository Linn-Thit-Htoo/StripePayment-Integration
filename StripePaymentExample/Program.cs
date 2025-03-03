var builder = WebApplication.CreateBuilder(args);

builder
    .Configuration.SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile(
        $"appsettings.{builder.Environment.EnvironmentName}.json",
        optional: false,
        reloadOnChange: true
    )
    .AddEnvironmentVariables();

builder.Services.Configure<StripeSetting>(builder.Configuration.GetSection("Stripe"));
StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "CORSPolicy",
        builder =>
            builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .SetIsOriginAllowed((hosts) => true)
    );
});

builder.Services.AddControllersWithViews();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(name: "default", pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
