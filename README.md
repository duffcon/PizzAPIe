```
cd PizzAPIe/FrontEnd
ng generate component Track
```

Add Route
```ts
//app.modules.ts
const appRoutes: Routes =
  [
    { path: 'home', component: HomeComponent },
	{ path: 'order', component: OrderComponent },
	{ path: 'track', component: TrackComponent },
    { path: '**', component: HomeComponent }
  ];
```

Add link to navbar
```html
//nav.component.html
<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <a style="color:whitesmoke" class="navbar-brand">PizzAPIe</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
	  <div class="navbar-nav">
	  	<a class="nav-item nav-link active" [routerLink]="['home']" [routerLinkActive]="['active']">Home <span class="sr-only">(current)</span></a>
	  	<a class="nav-item nav-link" [routerLink]="['order']" [routerLinkActive]="['active']">Order</a>
	  	<a class="nav-item nav-link" [routerLink]="['track']" [routerLinkActive]="['active']">Track</a>
	  </div>
  </div>
</nav>
```


```ts
//track.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
	private trackerForm: FormGroup;
	private submitted = false;
	private orderFound = false;

	constructor(private formBuilder: FormBuilder, private api: ApiService) {
	}

	ngOnInit() {
		this.trackerForm = this.formBuilder.group({
			ordernumber: ['', [Validators.required]],
			phone: ['555-555-5555', [Validators.required, Validators.pattern('^[0-9+-]+[0-9+-]+[0-9]$'), Validators.minLength(12), Validators.maxLength(12)]]
		}, { updateOn: 'blur' });
	}

	get f() { return this.trackerForm.controls; }

	onSubmit() {
		this.submitted = true;

		if (this.trackerForm.invalid) {
			return;
		}


		this.orderFound = true;
	}
}
```


```html
//track.component.html
<div class="container-fluid">
	<div *ngIf="!orderFound" class="row justify-content-center">

		<div class="col-*m-4">
			<form [formGroup]="trackerForm">

				<div class="form-group input-group ">
					<h5>Dude, where's my order?</h5>
				</div>


				<div class="form-group input-group">
					<div class="input-group-prepend"> <span class="input-group-text">Order #</span></div>
					<input type="text" formControlName="ordernumber" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.ordernumber.errors }" />
					<div *ngIf="submitted && f.ordernumber.errors" class="invalid-feedback">
						<div *ngIf="f.ordernumber.errors.required">Field required.</div>
					</div>
				</div>


				<div class="input-group form-group">
					<div class="input-group-prepend"> <span class="input-group-text">Phone #</span></div>
					<input type="tel" formControlName="phone" placeholder="123-123-1234" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.phone.errors }" />
					<div *ngIf="submitted && f.phone.errors" class="invalid-feedback">
						<div *ngIf="f.phone.errors.required">Field required.</div>
						<div *ngIf="f.phone.errors.minlength || f.phone.errors.maxlength">Format: 123-123-1234</div>

					</div>
				</div>

				<div class="form-group">
					<button class="btn btn-secondary" (click)="onSubmit()">Track</button>
				</div>

			</form>
		</div>
	</div>
	<div *ngIf="orderFound" class="row justify-content-center">
		
	</div>

</div>
```


```csharp
//HomeController.cs
// GET: api/Order/Options
[HttpGet("Order")]
public Order GetOptions(Order inorder)
{
	return pizzaService.GetOrder(inorder.OrderNumber, inorder.Phone);
}
```


```ts
//api.service.ts
getOrder(order) {
	return this.http.post(this.BASE_URL + "/api/Order/New", order);
}
```


```ts
//order.component.ts
export class Order {
	orderNumber: number;
	name: string;
	phone: string;
	time: string;
	size: PizzaElement;
	sauce: PizzaElement;
	cheese: PizzaElement;
	topping: PizzaElement;
	quantity: number;
	price: number;
}
```

```ts
//track.component.ts
import { Order } from '../order/order.component';
```


```ts
track.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { Order } from '../order/order.component';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
	private trackerForm: FormGroup;
	private submitted = false;
	private orderFound = false;
	private order = new Order();

	constructor(private formBuilder: FormBuilder, private api: ApiService) {
	}

	ngOnInit() {
		this.trackerForm = this.formBuilder.group({
			ordernumber: ['', [Validators.required]],
			phone: ['555-555-5555', [Validators.required, Validators.pattern('^[0-9+-]+[0-9+-]+[0-9]$'), Validators.minLength(12), Validators.maxLength(12)]]
		}, { updateOn: 'blur' });
	}

	get f() { return this.trackerForm.controls; }

	onSubmit() {
		this.submitted = true;

		if (this.trackerForm.invalid) {
			return;
		}
		var outOrder = new Order();
		outOrder.orderNumber = this.trackerForm.value.ordernumber;
		outOrder.phone = this.trackerForm.value.phone;
		this.api.getOrder(outOrder).subscribe(res => {
			if (res != null) {
				this.orderFound = true;
				this.order = res as Order;
			}
			else {
				this.trackerForm.controls.ordernumber.setErrors({ 'incorrect': true });
				this.trackerForm.controls.phone.setErrors({ 'incorrect': true });
			}
		});

	}
}

```



```html
//tracker.component.html
<div class="container-fluid">
	<div *ngIf="!orderFound" class="row justify-content-center">

		<div class="col-*m-4">
			<form [formGroup]="trackerForm">

				<div style="text-align: center;">
					<span style="font-size: 20px; font-family: sans-serif;">
						<strong> Dude where's my order: </strong>
					</span>
					
				</div>


				<div class="form-group input-group">
					<div class="input-group-prepend"> <span class="input-group-text">Order #</span></div>
					<input type="text" formControlName="ordernumber" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.ordernumber.errors }" />
					<div *ngIf="submitted && f.ordernumber.errors" class="invalid-feedback">
						<div *ngIf="f.ordernumber.errors.required">Field required.</div>
					</div>
				</div>


				<div class="input-group form-group">
					<div class="input-group-prepend"> <span class="input-group-text">Phone #</span></div>
					<input type="tel" formControlName="phone" placeholder="123-123-1234" class="form-control" [ngClass]="{ 'is-invalid': submitted && f.phone.errors }" />
					<div *ngIf="submitted && f.phone.errors" class="invalid-feedback">
						<div *ngIf="f.phone.errors.required">Field required.</div>
						<div *ngIf="f.phone.errors.minlength || f.phone.errors.maxlength">Format: 123-123-1234</div>

					</div>
				</div>

				<div class="form-group">
					<button class="btn btn-secondary" (click)="onSubmit()">Track</button>
				</div>

			</form>
		</div>
	</div>
	<div *ngIf="orderFound" class="row justify-content-center">

		<div class="row justify-content-center">
			<div class=" col-m-1">

				<div style="text-align: center;">
					<span style="font-size: 20px; font-family: sans-serif;">
						<strong> Your Order, {{order.name}}: </strong>
					</span>
				</div>
				<table class="table">

					<br />
					<tr>
						<td>Order #:</td>
						<td>{{order.orderNumber}}</td>
					</tr>
					
					<tr>
						<td>Order Time:</td>
						<td>{{order.time | date:'h:mm MM/dd/yyyy' }}</td>
					</tr>

					<tr>
						<td>Phone:</td>
						<td>{{order.phone}}</td>
					</tr>

					<tr>
						<td>Size:</td>
						<td>{{order.size.id}}</td>
					</tr>

					<tr>
						<td>Sauce:</td>
						<td>{{order.sauce.id}}</td>
					</tr>

					<tr>
						<td>Cheese:</td>
						<td>{{order.cheese.id}}</td>
					</tr>

					<tr>
						<td>Topping:</td>
						<td>{{order.topping.id}}</td>
					</tr>
					<tr>
						<td>Quantity:</td>
						<td>{{order.quantity}}</td>
					</tr>


				</table>
			</div>
		</div>

		</div>

</div>

```


Our database is a relational database the pizza elements will be null. Need more advanced query statement.
```csharp
//PizzaService.cs
using Microsoft.EntityFrameworkCore;

var query = pizzaContext.Orders
	.Where(o => o.OrderNumber == orderNumber)
	.Include(o => o.Size)
	.Include(o => o.Sauce)
	.Include(o => o.Cheese)
	.Include(o => o.Topping)
	.FirstOrDefault();
```


Routing Go from OrderComponent to TrackerComponent. Enter orderNumber and phone "automatically".

```ts
//app.module.ts
import { RouterModule, Router, ActivatedRoute, Routes } from '@angular/router';
```


```ts
//order.component.ts
import { Router } from '@angular/router';
import { TrackComponent } from '../track/track.component';

constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {
}

this.api.sendOrder(order).subscribe(res => {
	if (res != null) {
		this.router.navigate(["track"], { queryParams: { orderNumber: res, phone: order.phone } });
	}
	
});
```



```ts
//track.component.ts
import { ActivatedRoute } from '@angular/router';

constructor(private formBuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute) {
}

//If parameters provided
var p = this.route.queryParams.subscribe(val => {
	if (val != null) {
		var outOrder = new Order();
		outOrder.orderNumber = val.orderNumber;
		outOrder.phone = val.phone;
		this.api.getOrder(outOrder).subscribe(res => {
			if (res != null) {
				this.orderFound = true;
				this.order = res as Order;
			}
		});
		return;
	}
});
```
