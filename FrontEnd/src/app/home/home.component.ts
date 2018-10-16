import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	private homeMessage = new Message();

	constructor(private api: ApiService) {
		this.api.getHomeMessage().subscribe(res => {
			this.homeMessage = res as Message;
		})
	}

  ngOnInit() {
  }

}


class Message {
	heading: string;
	subHeading: string;
}
