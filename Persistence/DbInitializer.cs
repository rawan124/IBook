using System;
using System.Runtime.CompilerServices;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public static class DbInitializer
{
    public static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
    {
        string[] roles = ["SuperAdmin", "User"];

        foreach (var role in roles)
        {
            if (!await roleManager.RoleExistsAsync(role))
            {
                await roleManager.CreateAsync(new IdentityRole(role));
            }
        }
    }

    public static async Task SeedUsers(UserManager<User> userManager)
    {
        if (userManager.Users.Any()) return;

        var user = new User
        {
            UserName = "rawanbazzi@hotmail.com",
            Email = "rawanbazzi@hotmail.com"
        };

        var result = await userManager.CreateAsync(user, "Pa$$w0rd");

        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(user, "SuperAdmin");
        }
        else
        {
            foreach (var error in result.Errors)
            {
                Console.WriteLine(error.Description);
            }
        }
    }
}
