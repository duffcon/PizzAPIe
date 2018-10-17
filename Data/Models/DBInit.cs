using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzAPIe.Data.Models
{
    public class DBInit
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            PizzaContext context = applicationBuilder.ApplicationServices.GetRequiredService<PizzaContext>();

            if (!context.Sizes.Any())
            {

                context.Sizes.AddRange(
                    new Size { ID = "Small", Description = "Food for 1.", UnitPrice = 5.0 },
                    new Size { ID = "Medium", Description = "Meal today, lunch tomorrow.", UnitPrice = 7.0 },
                    new Size { ID = "Large", Description = "Food for the whole family.", UnitPrice = 9.0 }
                );
                context.Sauces.AddRange(
                    new Sauce { ID = "-", Description = "No sauce.", UnitPrice = 0.0 },
                    new Sauce { ID = "Tomato", Description = "Tradiation basil red sauce.", UnitPrice = 1.0 },
                    new Sauce { ID = "Alfredo", Description = "World famous creamy white sauce.", UnitPrice = 1.50 },
                    new Sauce { ID = "Pesto", Description = "Homemade pesto sauce made fresh daily.", UnitPrice = 1.50 }
                );
                context.Cheeses.AddRange(
                    new Cheese { ID = "-", Description = "No cheese.", UnitPrice = 0.0 },
                    new Cheese { ID = "Mozzarella", Description = "Standard pizza cheese.", UnitPrice = 2.0 },
                    new Cheese { ID = "Feta", Description = "For those lookin' to cheese it up.", UnitPrice = 3.0 }
                );

                context.Toppings.AddRange(
                    new Topping { ID = "-", Description = "No topping.", UnitPrice = 0.0 },
                    new Topping { ID = "Pepperoni", Description = "You know what pepperoni is.", UnitPrice = 3.0 },
                    new Topping { ID = "Green Peppers", Description = "Like a green red peppers.", UnitPrice = 2.0 },
                    new Topping { ID = "Mushrooms", Description = "Straight from the ground (but washed).", UnitPrice = 2.0 },
                    new Topping { ID = "Olives", Description = "Pick ripe from the jar.", UnitPrice = 2.0 },
                    new Topping { ID = "Chives", Description = "That chopped tiny green stuff.", UnitPrice = 1.0 }
                );

                var size = new Size { ID = "Small" };
                var sauce = new Sauce { ID = "Tomato" };
                var cheese = new Cheese { ID = "Feta" };
                var topping = new Topping { ID = "Pepperoni" };
                context.Orders.Add(new Order { OrderNumber = 1, Name = "John Smith", Phone = "555-555-5555", Size = size, Sauce = sauce, Cheese = cheese, Topping = topping, Quantity = 2, Price = 25.11 });
                context.SaveChanges();

            }

        }
    }
}
