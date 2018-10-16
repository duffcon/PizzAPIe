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
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [Key]
        public string ID { get; set; }
        public string Description { get; set; }
        public double UnitPrice { get; set; }

    }
    public class Size : PizzaElement { }
    public class Sauce : PizzaElement { }
    public class Cheese : PizzaElement { }
    public class Topping : PizzaElement { }

    public class Order
    {
        public int OrderNumber { get; set; }
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
```




Create corresponding FrontEnd class while its fresh in your mind.
```ts
//order.component.ts
class PizzaElement {
	Name: string;
	Description: string;
	UnitPrice: number;
}

class Order {
	OrderNumber: number;
	Name: string;
	Phone: string;
	Time: Date;
	Size: PizzaElement;
	Sauce: PizzaElement;
	Cheese: PizzaElement;
	Topping: PizzaElement;
	Quantity: number;
	Price: number;
}
```



Optional: I used this to get rid of warnings, this will be outdated soon.
```
Install-Package Microsoft.EntityFrameworkCore.Tools -Version 2.1.4
```

Initialize Database:
```c#
//Startup.cs
services.AddDbContext<PizzaContext>
	(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
```

Tools > NuGet Package Manager > Package Manager Console
```bash
//dotnet CLI
dotnet ef migration add init
//Entity Framework Tools CLI
add-migration init
//Undo
remove-migration
```




```bash
//dotnet CLI
dotnet ef database update
//Entity Framework Tools CLI
update-database
//Undo
drop-database
```



Create DB initializer with Seed function
```
//DBInit.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzAPIe.Data.Models
{
    public class DBInit
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            PizzaContext context = applicationBuilder.ApplicationServices.GetRequiredService<PizzaContext>();

        }
    }
}
```




```
//DBInit.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzAPIe.Data.Models
{
    public class DBInit
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            PizzaContext context = applicationBuilder.ApplicationServices.GetRequiredService<PizzaContext>();

            if (!context.Sizes.Any())
            {

                context.Sizes.AddRange(
                    new Size { ID = "Small", Description = "Food for 1.", UnitPrice = 5.0 },
                    new Size { ID = "Medium", Description = "Meal today, lunch tomorrow.", UnitPrice = 7.0 },
                    new Size { ID = "Large", Description = "Food for the whole family.", UnitPrice = 9.0 }
                );
                context.Sauces.AddRange(
                    new Sauce { ID = "-", Description = "No sauce.", UnitPrice = 0.0 },
                    new Sauce { ID = "Tomato", Description = "Tradiation basil red sauce.", UnitPrice = 1.0 },
                    new Sauce { ID = "Alfredo", Description = "World famous creamy white sauce.", UnitPrice = 1.50 },
                    new Sauce { ID = "Pesto", Description = "Homemade pesto sauce made fresh daily.", UnitPrice = 1.50 }
                );
                context.Cheeses.AddRange(
                    new Cheese { ID = "-", Description = "No cheese.", UnitPrice = 0.0 },
                    new Cheese { ID = "Mozzarella", Description = "Standard pizza cheese.", UnitPrice = 2.0 },
                    new Cheese { ID = "Feta", Description = "For those lookin' to cheese it up.", UnitPrice = 3.0 }
                );

                context.Toppings.AddRange(
                    new Topping { ID = "-", Description = "No topping.", UnitPrice = 0.0 },
                    new Topping { ID = "Pepperoni", Description = "You know what pepperoni is.", UnitPrice = 3.0 },
                    new Topping { ID = "Green Peppers", Description = "Like a green red peppers.", UnitPrice = 2.0 },
                    new Topping { ID = "Mushrooms", Description = "Straight from the ground (but washed).", UnitPrice = 2.0 },
                    new Topping { ID = "Olives", Description = "Pick ripe from the jar.", UnitPrice = 2.0 },
                    new Topping { ID = "Chives", Description = "That chopped tiny green stuff.", UnitPrice = 1.0 }
                );
                context.SaveChanges();
            }

        }
    }
}
```

Optional test adding an order to the database
```
var s = new Size { ID = "Large" };
context.Entry(s).State = Microsoft.EntityFrameworkCore.EntityState.Unchanged;
context.Orders.Add(new Order { Name = "john", Phone = "555-555-5555", Size = s, Quantity = 1 });
context.SaveChanges();
```


Call Seed Function in Startup
```c#
//Startup.cs 
DBInit.Seed(app);
```



Get rid of warning, Im not sure exactly what it does.
Change this:
```c#
//Program.cs
WebHost.CreateDefaultBuilder(args)
	.UseStartup<Startup>();
```


To this:
```c#
//Program.cs
WebHost.CreateDefaultBuilder(args)
	.UseStartup<Startup>()
	.UseDefaultServiceProvider(options =>
			options.ValidateScopes = false);
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







Import Forms Component
```ts
//app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';


const appRoutes: Routes =
  [
    { path: 'home', component: HomeComponent },
    { path: 'order', component: OrderComponent },
    { path: '**', component: HomeComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
	RouterModule.forRoot(appRoutes),
	FormsModule,
	ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
