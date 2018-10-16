using PizzAPIe.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PizzAPIe.Data.interfaces
{
    public interface IPizzaService
    {
        PizzaOptions GetOptions { get; }
        bool NewOrder(Order order);
        Order GetOrder(int orderNumber, string phone);
    }
}
