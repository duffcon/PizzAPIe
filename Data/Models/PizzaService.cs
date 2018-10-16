using PizzAPIe.Data.interfaces;
using PizzAPIe.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzAPIe.Data.Models
{
    public class PizzaService : IPizzaService
    {
        private readonly PizzaContext pizzaContext;

        public PizzaService(PizzaContext _pizzaContext)
        {
            pizzaContext = _pizzaContext;
        }

        public PizzaOptions GetOptions {
            get
            {
                var options = new PizzaOptions();
            
                options.Sizes = (from s in pizzaContext.Sizes orderby s.ID select s).ToList<Size>();
                options.Sauces = (from s in pizzaContext.Sauces orderby s.ID select s).ToList<Sauce>();
                options.Cheeses = (from s in pizzaContext.Cheeses orderby s.ID select s).ToList<Cheese>();
                options.Toppings = (from s in pizzaContext.Toppings orderby s.ID select s).ToList<Topping>();

                return options;
            }

        }
        public bool NewOrder(Order order)
        {
            pizzaContext.AttachRange(order.Size, order.Sauce,
                order.Cheese, order.Topping);

            pizzaContext.Orders.Add(order);
            int rows = pizzaContext.SaveChanges();
            return (rows == 1) ? true : false; 
        }
        public Order GetOrder(int orderNumber, string phone)
        {
            var query = (from s in pizzaContext.Orders
                         where s.OrderNumber == orderNumber
                         select s).FirstOrDefault();
            if (query != null && query.Phone == phone)
            {
                return query;
            }
            else
            {
                return null;
            }
            
        }

    }
}
