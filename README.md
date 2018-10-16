Entity Framework Code First.

Use data annotations.
```csharp
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
    public class PizzaOptions
    {
        public List<Size> Sizes { get; set; }
        public List<Sauce> Sauces { get; set; }
        public List<Cheese> Cheeses { get; set; }
        public List<Topping> Toppings { get; set; }
    }
}
```


Or use Fluent Api to set the key. Order ID generated starting at 1000.
dbo is the default. After "update-database" command the tables have dbo in their name.
Pizza Context
```csharp
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
class PizzaOptions {
	sizes = new Array<PizzaElement>();
	sauces = new Array<PizzaElement>();
	cheeses = new Array<PizzaElement>();
	toppings = new Array<PizzaElement>(); 
}

class PizzaElement {
	id: string;
	description: string;
	unitPrice: number;
}

class Order {
	orderNumber: number;
	name: string;
	phone: string;
	time: string;
	size: PizzaElement;
	sauce: PizzaElement;
	cheese: PizzaElement;
	topping: PizzaElement;
	quantity: number;
	price: number;
}
```



Optional: I used this to get rid of warnings, this will be outdated soon.
```bash
Install-Package Microsoft.EntityFrameworkCore.Tools -Version 2.1.4
```

Initialize Database:
```csharp
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
```csharp
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




```csharp
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
```csharp
var s = new Size { ID = "Large" };
context.Entry(s).State = Microsoft.EntityFrameworkCore.EntityState.Unchanged;
context.Orders.Add(new Order { Name = "john", Phone = "555-555-5555", Size = s, Quantity = 1 });
context.SaveChanges();
```


Call Seed Function in Startup
```csharp
//Startup.cs 
DBInit.Seed(app);
```



Get rid of warning, Im not sure exactly what it does.
Change this:
```csharp
//Program.cs
WebHost.CreateDefaultBuilder(args)
	.UseStartup<Startup>();
```


To this:
```csharp
//Program.cs
WebHost.CreateDefaultBuilder(args)
	.UseStartup<Startup>()
	.UseDefaultServiceProvider(options =>
			options.ValidateScopes = false);
```





mkdir Data/interfaces
Create Interface to inject into app
```csharp
//IPizzaService.cs
using PizzAPIe.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzAPIe.Data.interfaces
{
    public interface IPizzaService
    {
        PizzaOptions GetOptions { get; }
        bool NewOrder(Order order);
        Order GetOrder(int orderNumber, string phone);
    }
}

```


Implement interface
```csharp
//PizzaService.cs
using PizzAPIe.Data.interfaces;
using PizzAPIe.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzAPIe.Data.Models
{
    public class PizzaService : IPizzaService
    {
        private readonly PizzaContext pizzaContext;

        public PizzaService(PizzaContext _pizzaContext)
        {
            pizzaContext = _pizzaContext;
        }

        public PizzaOptions GetOptions {
            get
            {
                var options = new PizzaOptions();
            
                options.Sizes = (from s in pizzaContext.Sizes orderby s.ID select s).ToList<Size>();
                options.Sauces = (from s in pizzaContext.Sauces orderby s.ID select s).ToList<Sauce>();
                options.Cheeses = (from s in pizzaContext.Cheeses orderby s.ID select s).ToList<Cheese>();
                options.Toppings = (from s in pizzaContext.Toppings orderby s.ID select s).ToList<Topping>();

                return options;
            }

        }
        public bool NewOrder(Order order)
        {
            pizzaContext.AttachRange(order.Size, order.Sauce,
                order.Cheese, order.Topping);

            pizzaContext.Orders.Add(order);
            int rows = pizzaContext.SaveChanges();
            return (rows == 1) ? true : false; 
        }
        public Order GetOrder(int orderNumber, string phone)
        {
            var query = (from s in pizzaContext.Orders
                         where s.OrderNumber == orderNumber
                         select s).FirstOrDefault();
            if (query != null && query.Phone == phone)
            {
                return query;
            }
            else
            {
                return null;
            }
            
        }

    }
}
```



Attach so the database knows Topping X already exists
```csharp
pizzaContext.AttachRange(order.Size, order.Sauce,
	order.Cheese, order.Topping);
```


Can also
```csharp
pizzaContext.Sizes.Attach(order.Size);
pizzaContext.Sauces.Attach(order.Sauce);
pizzaContext.Cheeses.Attach(order.Cheese);
pizzaContext.Toppings.Attach(order.Topping);
```



Or
```csharp
pizzaContext.Entry(order.Size).State = EntityState.Unchanged;
pizzaContext.Entry(order.Sauce).State = EntityState.Unchanged;
pizzaContext.Entry(order.Cheese).State = EntityState.Unchanged;
pizzaContext.Entry(order.Topping).State = EntityState.Unchanged;
```


Lots of help from http://jasonwatmore.com/post/2018/05/10/angular-6-reactive-forms-validation-example

Import Forms Component
```ts
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

//Declare FormGroup object
private orderForm: FormGroup;

//Initialize FormGroup object
this.orderForm = this.formBuilder.group({
	name: ['John', [Validators.required, Validators.minLength(4)]],
}, { updateOn: 'blur' });

//Check Valididity
if (this.orderForm.invalid) {
	return;
}
```

Use in Html
```html
//order.component.html
<div class="container-fluid">

	<div class="row col-md-4">
		<br />
	</div>

	<div class="row col-md-4">
		<h5>Order Now:</h5>
	</div>


	<div class="row col-lg-auto">
		<form [formGroup]="orderForm">

			<div class="input-group form-group">
				<div class="input-group-prepend"> <span class="input-group-text">Name</span></div>
				<input type="text" formControlName="name" class="form-control" [ngClass]="{ 'is-invalid': submitted && this.orderForm.controls.name.errors }" />
				<div *ngIf="submitted && this.orderForm.controls.name.errors" class="invalid-feedback">
					<div *ngIf="this.orderForm.controls.name.errors.required">Field is required</div>
				</div>

			</div>


			<div class="input-group">
				<button class="btn btn-secondary" (click)="onSubmit()">Submit</button>
			</div>


		</form>
	</div>

</div>
```

Shortcut
```ts
get f() { return this.orderForm.controls; }
f.Name.....
```


```html
//order.component.html
<div class="container-fluid">

	<div class="row col-md-4">
		<br />
	</div>

	<div class="row justify-content-center">
		<form [formGroup]="orderForm">

			<div class="row col-sm-6">
				<h5>Order Now:</h5>
			</div>


			<div class="input-group form-group">
				<div class="input-group-prepend"> <span class="input-group-text">Name</span></div>
				<input type="text" formControlName="name" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.name.errors }" />
			</div>

			<div class="input-group form-group">
				<div class="input-group-prepend"> <span class="input-group-text">Phone</span></div>
				<input type="text" formControlName="phone" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.phone.errors }" />
			</div>


			<div class="input-group form-group">
				<div class="input-group-prepend"> <span class="input-group-text">Size</span></div>
				<select formControlName="size" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.size.errors }">
					<option *ngFor="let e of pizzaOptions.sizes;" [ngValue]="e" data-placement="right" title="{{e.description}}"> {{e.id}} </option>
				</select>
			</div>

			<div class="input-group form-group">
				<div class="input-group-prepend"> <span class="input-group-text">Sauce</span></div>
				<select formControlName="sauce" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.sauce.errors }">
					<option *ngFor="let e of pizzaOptions.sauces;" [ngValue]="e" data-placement="right" title="{{e.description}}"> {{e.id}} </option>
				</select>
			</div>


			<div class="input-group form-group">
				<div class="input-group-prepend"> <span class="input-group-text">Cheese</span></div>
				<select formControlName="cheese" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.cheese.errors }">
					<option *ngFor="let e of pizzaOptions.cheeses;" [ngValue]="e" data-placement="right" title="{{e.description}}"> {{e.id}} </option>
				</select>
			</div>


			<div class="input-group form-group">
				<div class="input-group-prepend"> <span class="input-group-text">Topping</span></div>
				<select formControlName="topping" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.topping.errors }">
					<option *ngFor="let e of pizzaOptions.toppings;" [ngValue]="e" data-placement="right" title="{{e.description}}"> {{e.id}} </option>
				</select>
			</div>

			<div class="input-group form-group">
				<div class="input-group-prepend"> <span class="input-group-text">Quantity</span></div>
				<input type="number" min="1" max="50" formControlName="quantity" class="form-control"/>
			</div>

			<div class="input-group for-group">
				<div style="padding-right:10em;">
					<button class="btn btn-secondary" (click)="onSubmit()">Submit</button>
				</div>

				<div>
					<label class="price">Total: ${{price}} </label>
				</div>
			</div>


		</form>
	</div>

</div>


```

Inject PizzaService to OrderController
```csharp
//Startup.cs
services.AddTransient<IPizzaService, PizzaService>();
```


```csharp
//OrderController.cs
public IPizzaService pizzaService;

public OrderController(IPizzaService _pizzaService)
{
	pizzaService = _pizzaService;
}
```

Use Service.
```csharp
//OrderController.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzAPIe.Data.interfaces;
using PizzAPIe.Data.Models;

namespace PizzAPIe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        public IPizzaService pizzaService;

        public OrderController(IPizzaService _pizzaService)
        {
            pizzaService = _pizzaService;
        }

        // GET: api/Order/Options
        [HttpGet("Options")]
        public PizzaOptions GetOptions()
        {
            return pizzaService.GetOptions;
        }


        // Post: api/Order/New
        [HttpPost("New")]
        public bool Post([FromBody] Order order)
        {
            return pizzaService.NewOrder(order);
        }
    }
}
```




