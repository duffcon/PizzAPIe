import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
	private options = new Array<PizzaElement>();
	private orderNumber = null;

	constructor(private api: ApiService) {
		this.api.getPizzaOptions().subscribe(res => {
			this.options = res as Array<PizzaElement>;
		});
	}

	ngOnInit() {
	}

	onSubmit() {
		this.api.sendOrder().subscribe(res => {
			this.orderNumber = res as number;
		})
	}

}


class PizzaElement {
	Name: string;
	Description: string;
	UnitPrice: number;
}

class Order {
	OrderNumber: number;
	Name: string;
	Phone: string;
	Time: Date;
	Size: PizzaElement;
	Sauce: PizzaElement;
	Cheese: PizzaElement;
	Topping: PizzaElement;
	Quantity: number;
	Price: number;
}
