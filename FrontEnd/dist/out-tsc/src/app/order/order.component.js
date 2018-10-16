var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
var OrderComponent = /** @class */ (function () {
    function OrderComponent(formBuilder, api, router) {
        this.formBuilder = formBuilder;
        this.api = api;
        this.router = router;
        this.pizzaOptions = new PizzaOptions();
        this.submitted = false;
        this.price = 0;
    }
    OrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orderForm = this.formBuilder.group({
            name: ['John', [Validators.required, Validators.minLength(4)]],
            phone: ['555-555-5555', [Validators.required]],
            size: ['', [Validators.required]],
            sauce: ['', [Validators.required]],
            cheese: ['', [Validators.required]],
            topping: ['', [Validators.required]],
            quantity: [1, [Validators.required]]
        }, { updateOn: 'blur' });
        this.orderForm.valueChanges.subscribe(function (val) {
            var temp = [val.size, val.sauce, val.cheese, val.toppings];
            _this.price = 0;
            for (var _i = 0, temp_1 = temp; _i < temp_1.length; _i++) {
                var i = temp_1[_i];
                if (i) {
                    _this.price += i.unitPrice;
                }
            }
            _this.price *= val.quantity;
        });
        this.api.getPizzaOptions().subscribe(function (res) {
            _this.pizzaOptions = res;
        });
    };
    OrderComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        if (this.orderForm.invalid) {
            return;
        }
        var order = new Order();
        order.name = this.orderForm.value.name;
        order.phone = this.orderForm.value.phone;
        order.time = new Date().toLocaleTimeString();
        order.size = this.orderForm.value.size;
        order.sauce = this.orderForm.value.sauce;
        order.cheese = this.orderForm.value.cheese;
        order.topping = this.orderForm.value.topping;
        order.quantity = this.orderForm.value.quantity;
        order.price = this.price;
        this.api.sendOrder(order).subscribe(function (res) {
            if (res != null) {
                _this.router.navigate(["track"], { queryParams: { orderNumber: order.orderNumber, phone: order.phone } });
            }
        });
    };
    Object.defineProperty(OrderComponent.prototype, "f", {
        get: function () { return this.orderForm.controls; },
        enumerable: true,
        configurable: true
    });
    OrderComponent = __decorate([
        Component({
            selector: 'app-order',
            templateUrl: './order.component.html',
            styleUrls: ['./order.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder, ApiService, Router])
    ], OrderComponent);
    return OrderComponent;
}());
export { OrderComponent };
var PizzaOptions = /** @class */ (function () {
    function PizzaOptions() {
        this.sizes = new Array();
        this.sauces = new Array();
        this.cheeses = new Array();
        this.toppings = new Array();
    }
    return PizzaOptions;
}());
var PizzaElement = /** @class */ (function () {
    function PizzaElement() {
    }
    return PizzaElement;
}());
export { PizzaElement };
var Order = /** @class */ (function () {
    function Order() {
        this.size = new PizzaElement();
        this.sauce = new PizzaElement();
        this.cheese = new PizzaElement();
        this.topping = new PizzaElement();
    }
    return Order;
}());
export { Order };
//# sourceMappingURL=order.component.js.map