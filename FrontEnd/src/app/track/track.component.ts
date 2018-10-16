import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';
import { Order } from '../order/order.component';
import { ActivatedRoute } from '@angular/router';

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

	constructor(private formBuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute) {
	}
	
	ngOnInit() {
		
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
