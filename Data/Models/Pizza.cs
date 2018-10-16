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