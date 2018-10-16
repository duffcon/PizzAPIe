using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzAPIe.Data.Models
{
    public class PizzaContext :DbContext
    {
        public PizzaContext(DbContextOptions<PizzaContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>()
                .HasKey(o => o.OrderNumber);

            modelBuilder.HasSequence<int>("NextOrderNumber", schema: "dbo")
                .StartsAt(1000)
                .IncrementsBy(2);

            modelBuilder.Entity<Order>()
                .Property(o => o.OrderNumber)
                .HasDefaultValueSql("NEXT VALUE FOR dbo.NextOrderNumber");
        }

        public DbSet<Size> Sizes { get; set; }
        public DbSet<Sauce> Sauces { get; set; }
        public DbSet<Cheese> Cheeses { get; set; }
        public DbSet<Topping> Toppings { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
