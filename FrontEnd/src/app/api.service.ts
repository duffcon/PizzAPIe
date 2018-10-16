import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
	BASE_URL = "http://localhost:19864";

	constructor(private http: HttpClient) {
	}

	getHomeMessage() {
		return this.http.get(this.BASE_URL + "/api/Home");
	}

	getPizzaOptions() {
		return this.http.get(this.BASE_URL + "/api/Order/Options");
	}

	sendOrder(order) {
		return this.http.post(this.BASE_URL + "/api/Order/New", order);
	}

	getOrder(order) {
		return this.http.post(this.BASE_URL + "/api/Order/Order", order);
	}
 
}
