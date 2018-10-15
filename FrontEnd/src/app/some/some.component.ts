import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-some',
  templateUrl: './some.component.html',
  styleUrls: ['./some.component.css']
})
export class SomeComponent implements OnInit {
  private name = new FormControl('', Validators.minLength(5));

  constructor() {

  }

  ngOnInit() {
  }

  click() {

  }

}
