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
            var options = new List<PizzaElement>();
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