Entity Framework Code First.

Pizza Element does not adhere to "ID" convention. Use data annotations.
```c#
//Pizza.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PizzAPIe.Data.Models
{
    public class PizzaElement
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Name { get; set; }
        public string Description { get; set; }
        public double UnitPrice { get; set; }
    }
    public class Size : PizzaElement { }
    public class Sauce : PizzaElement { }
    public class Cheese : PizzaElement { }
    public class Topping : PizzaElement { }

    public class Order
    {
        public int Number { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public DateTime Time { get; set; }
        public Size Size { get; set; }
        public Sauce Sauce { get; set; }
        public Cheese Cheese { get; set; }
        public Topping Topping { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}
```


Or use Fluent Api to set the key. Order ID generated starting at 1000.
dbo is the default. After "update-database" command the tables have dbo in their name.
Pizza Context
```c#
//PizzaContext.cs
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

            modelBuilder.HasSequence<int>("NextOrderNumber", schema: "dbo")
                .StartsAt(1000)
                .IncrementsBy(2);

            modelBuilder.Entity<Order>()
                .HasKey(p => p.Number);

            modelBuilder.Entity<Order>()
                .Property(o => o.Number)
                .HasDefaultValueSql("NEXT VALUE FOR dbo.NextOrderNumber");
        }

        public DbSet<Size> Sizes { get; set; }
        public DbSet<Sauce> Sauces { get; set; }
        public DbSet<Cheese> Cheeses { get; set; }
        public DbSet<Topping> Toppings { get; set; }
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}

```




```
```




```
```




```
```




```
```




```
```




```
```




```
```




```
```




```
```




```
```




```
```








