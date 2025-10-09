using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
        .HasData(
            new IdentityRole { Id = "b428129e-4420-40c2-b95e-8cf001ca4b78", Name = "Member", NormalizedName = "MEMBER" },
            new IdentityRole { Id = "e32cffc0-3a4a-43fb-a4c4-76df4096baf3", Name = "Admin", NormalizedName = "ADMIN" }
        );
    }
}
