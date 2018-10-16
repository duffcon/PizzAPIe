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