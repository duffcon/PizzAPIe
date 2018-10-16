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



```
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
        // GET: api/Home
        [HttpGet]
        public string Get()
        {
            return "Home Page";
        }
    }
}
```





Create OrderController
```c#
//OrderController.cs

```




```
```




```
```




```
```




```
```





