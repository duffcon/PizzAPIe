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
        
    }

    public class Order
    {
        public int Number { get; set; }
        public string Name { get; set; } 
        public string Phone { get; set; }
        public DateTime Time { get; set; }
        public Pizza Pizza { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }


}
