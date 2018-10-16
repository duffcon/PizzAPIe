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