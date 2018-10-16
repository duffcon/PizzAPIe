import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackComponent } from '../track/track.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
	private pizzaOptions = new PizzaOptions();
	private orderForm: FormGroup;
	private submitted = false;
	private price: number = 0;

	constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {
	}

	ngOnInit() {

		this.orderForm = this.formBuilder.group({
			name: ['John', [Validators.required, Validators.minLength(4)]],
			phone: ['555-555-5555', [Validators.required]],
			size: ['', [Validators.required]],
			sauce: ['', [Validators.required]],
			cheese: ['', [Validators.required]],
			topping: ['', [Validators.required]],
			quantity: [1, [Validators.required]]
		}, { updateOn: 'blur' });



		this.orderForm.valueChanges.subscribe(val => {
			var temp = [val.size, val.sauce, val.cheese, val.toppings]
			this.price = 0;
			for (let i of temp) {
				if (i) {
					this.price += i.unitPrice;
				}
			}
			this.price *= val.quantity;
		});

		this.api.getPizzaOptions().subscribe(res => {
			
			this.pizzaOptions = res as PizzaOptions;
		});


		
	}

	onSubmit() {
		this.submitted = true;
		
		if (this.orderForm.invalid) {
			return;
		}

		var order: Order = new Order();
		order.name = this.orderForm.value.name;
		order.phone = this.orderForm.value.phone;
		order.time = new Date().toLocaleTimeString();
		order.size = this.orderForm.value.size;
		order.sauce = this.orderForm.value.sauce;
		order.cheese = this.orderForm.value.cheese;
		order.topping = this.orderForm.value.topping;
		order.quantity = this.orderForm.value.quantity;
		order.price = this.price;
		this.api.sendOrder(order).subscribe(res => {
			if (res != null) {
				this.router.navigate(["track"], { queryParams: { orderNumber: res, phone: order.phone } });
			}
			
		});
	}

	get f() { return this.orderForm.controls; }
}

class PizzaOptions {
	sizes = new Array<PizzaElement>();
	sauces = new Array<PizzaElement>();
	cheeses = new Array<PizzaElement>();
	toppings = new Array<PizzaElement>(); 
}

export class PizzaElement {
	id: string;
	description: string;
	unitPrice: number;
}

export class Order {
	orderNumber: number;
	name: string;
	phone: string;
	time: string;
	size: PizzaElement = new PizzaElement();
	sauce: PizzaElement = new PizzaElement();
	cheese: PizzaElement = new PizzaElement();
	topping: PizzaElement = new PizzaElement();
	quantity: number;
	price: number;
}
