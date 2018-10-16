```
dotnet new web
ng new FrontEnd
Open as Project/Solution
```

Add appsettings.json file


```json
//appsettings.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=PizzaDB;Trusted_Connection=True;MultipleActiveResultSets=true"
  },

  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "AllowedHosts": "*"

}
```

Update startup for SPA
```c#
//startup.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace PizzAPIe
{
    public class Startup
    {

        public IConfiguration Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json")
                .Build();
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddCors(options => options.AddPolicy("Cors", builder =>
            {
                builder
                   .AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
            }));
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "FrontEnd/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseMvcWithDefaultRoute();
           
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "FrontEnd";
                spa.UseAngularCliServer(npmScript: "start");

            });
        }
    }
}
```









```bash
ng generate component Nav
ng generate component Home
ng generate component Order
ng generate service Api
npm install --save jquery
npm install --save bootstrap
```



```
//angular.json
"styles": [
  "src/styles.css",
  "./node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
]
```



```ts
//app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```



```html
//app.component.html
<div>
  <app-nav></app-nav>
</div>

<div class='col-xl-12 body-content'>
  <router-outlet></router-outlet>
</div>
```



```html
//nav.component.html
<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <a style="color:whitesmoke" class="navbar-brand">PizzAPIe</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" [routerLink]="['home']" [routerLinkActive]="['active']">Home <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" [routerLink]="['order']" [routerLinkActive]="['active']">Order</a>

    </div>
  </div>
</nav>
```


```
//Properties/launchSettings.json
remove ssl
copy application URL http://localhost:19864
```

```ts
//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	BASE_URL = "http://localhost:19864";

	constructor(private http: HttpClient) {
	}

	getHomeMessage() {
		return this.http.get(this.BASE_URL + "/api/Home");
	}

	getPizzaOptions() {
		return this.http.get(this.BASE_URL + "/api/Order/Options");
	}
 
}
```




Create Folders
```
mkdir Controllers
mkdir Data 
mkdir Data/Models
```


Create Classes
```c#
//Pizza.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzAPIe.Data.Models
{
    public class PizzaElement
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double UnitPrice { get; set; }
    }
    public class Size : PizzaElement { }
    public class Sauce : PizzaElement { }
    public class Cheese : PizzaElement { }
    public class Topping : PizzaElement { }

    public class Pizza
    {
        public int ID { get; set; }
        public Size Size { get; set; } 
        public Sauce Sauce { get; set; } 
        public Cheese Cheese { get; set; }
        public Topping Topping { get; set; } 
        public int Quantity { get; set; }
    }

    public class Order
    {
        public int Number { get; set; }
        public string Name { get; set; } 
        public string Phone { get; set; }
        public DateTime Time { get; set; }
        public Pizza Pizza { get; set; } 
        public double Price { get; set; }
    }


}
```





Create HomeController
```c#
//HomeController.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PizzAPIe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        public class Message
        {
            public string Heading { get; set; }
            public string SubHeading { get; set; }
        }
        // GET: api/Home
        [HttpGet]
        public Message Get()
        {
            return new Message { Heading = "Welcome to PizzAPIe", SubHeading = "The Very Best"};
        }
    }
}
```

```ts
//home.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	private homeMessage = new Message();

	constructor(private api: ApiService) {
		this.api.getHomeMessage().subscribe(res => {
			this.homeMessage = res as Message;
		})
	}

  ngOnInit() {
  }

}


class Message {
	heading: string;
	subHeading: string;
}
```


```html
//home.component.html
<div style="padding: 1em;"class="container-fluid">
	<div class="row ">
		<h5> {{homeMessage.heading}}</h5>
	</div>
	<div class="row">
		<h6> {{homeMessage.subHeading}}</h6>
	</div>
</div>

```



Create OrderController
```c#
//OrderController.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PizzAPIe.Data.Models;

namespace PizzAPIe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        // GET: api/Order/Options
        [HttpGet("Options")]
        public IEnumerable<PizzaElement> GetOptions()
        {
            var options = new List<Topping> {
                new Topping { Name = "Pepperoni", Description = "You know what pepperoni is.", UnitPrice = 3.0 },
                new Topping { Name = "Green Peppers", Description = "Like a green red peppers.", UnitPrice = 2.0 },
                new Topping { Name = "Mushrooms", Description = "Straight from the ground (but washed).", UnitPrice = 2.0 },
                new Topping { Name = "Olives", Description = "Pick ripe from the jar.", UnitPrice = 2.0 },
                new Topping { Name = "Chives", Description = "That chopped tiny green stuff.", UnitPrice = 1.0 }
            };
            return options;
        }


        // Post: api/Order/New
        [HttpPost("New")]
        public int Post([FromBody] Order order)
        {
            //Fake order number
            return 1037;

        }
    }
}
```




```ts
//order.component.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
	private options = new Array<PizzaElement>();
	private orderNumber = null;

	constructor(private api: ApiService) {
		this.api.getPizzaOptions().subscribe(res => {
			this.options = res as Array<PizzaElement>;
		});
	}

	ngOnInit() {
	}

	onSubmit() {
		this.api.sendOrder().subscribe(res => {
			this.orderNumber = res as number;
		})
	}

}


class PizzaElement {
	name: string;
	description: string;
	unitPrice: number;
}
```




```html
//order.component.html
<div class="contaier-fluid">
	<div class="row justify-content-center">
		<form>

			<div class="form-group">
				<table>
					<tr *ngFor="let o of options">
						<td>{{o.name}}</td>
					</tr>
				</table>

			</div>

			<div class="form-group">
				<input type="button" value="Submit" (click)="onSubmit()" />
				<br />
				<label *ngIf="orderNumber != null">Order#:{{orderNumber}}</label>
			</div>

		</form>
	</div>
</div>
```




```
```




```
```





