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