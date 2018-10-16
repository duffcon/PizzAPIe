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


        // POST: api/Order/New
        [HttpPost("New")]
        public int? Post([FromBody] Order order)
        {
            var ordernumber = pizzaService.NewOrder(order);
            return ordernumber;
        }


        // POST: api/Order/Order
        [HttpPost("Order")]
        public Order GetOrder([FromBody] Order order)
        {
            var neworder = pizzaService.GetOrder(order.OrderNumber, order.Phone);
            return neworder;
        }
    }
}