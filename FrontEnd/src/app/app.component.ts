import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  private BASE_URL = "http://localhost:11703";
  private indata: any;
  private outdata = new TypescriptData();


  constructor(private http: HttpClient) {



    this.http.get(this.BASE_URL + "/api/Values").subscribe(res => {
      console.log(res);
    });

    this.http.post(this.BASE_URL + "/api/Values", ["one", "two"]).subscribe(res => {
      
      console.log(res);
    });

    this.http.get(this.BASE_URL + "/api/Values/Class").subscribe(res => {
      this.indata = res;
      console.log(res);
    });

    this.http.post(this.BASE_URL + "/api/Values/Class", this.outdata).subscribe(res => {
       console.log(res);
    });

  }

}


class TypescriptData {
  item1: string = "asdf";
  item2: number = 17;
}
