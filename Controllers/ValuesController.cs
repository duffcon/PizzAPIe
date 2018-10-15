using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace PizzAPIe.Controllers
{

    public class Data
    {
        public string Item1 { get; set; }
        public int Item2 { get; set; }

    }

    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
       
        [HttpGet]
        public ActionResult <IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }


        // POST api/values
        [HttpPost]
        public void Post([FromBody] IEnumerable<string> value)
        {
        }

        // GET api/values/Class
        [HttpGet("Class")]
        public Data GetClass()
        {
            return new Data { Item1 = "string", Item2 = 9 };
        }

        // POST api/values/Class
        [HttpPost("Class")]
        public void Post([FromBody] Data d)
        {
        }

    }
}
