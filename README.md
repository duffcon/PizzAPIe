```
ng new FrontEnd
cd FrontEnd
npm install
ng serve
http://localhost:4200/
```


Html located in app.component.ts. Modify and save.
```
//app/app.component.ts
<div style="text-align:center">
  <h3>Welcome to angular</h3>
</div>

```




```
ng generate component Some
```




Display SomeComponent within AppComponent
```
//app/app.component.ts
<div style="text-align:center">
  <app-some></app-some>
</div>

```



Make your own component: Import and Declare.
```
//app.module.ts
import { SomeComponent } from './some/some.component';
```



Use basic HTML
```
//some.component.html
<p>
  <label>Name: </label>
  <input type="text" name="name" value="" />
</p>
```



Use an Angular Component: Import then Import.
```
//app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Angular Components
import { ReactiveFormsModule } from '@angular/forms';

//My Components
import { AppComponent } from './app.component';
import { SomeComponent } from './some/some.component';

@NgModule({
  declarations: [
    AppComponent,
    SomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```


```
//some.component.ts
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
```



```
//some.component.html
<label>First Name: </label>
<input class="form-control" type="text" [formControl]="name" />
<br />
<label *ngIf="name.invalid">Invalid Name</label>

```