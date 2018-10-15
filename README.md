
```bash
ng generate component Nav
ng generate component A
ng generate component B

```




```ts
//app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Angular Components
import { RouterModule, Routes } from '@angular/router';

//My Components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';

const appRoutes: Routes =
  [
    { path: 'A', component: AComponent },
    { path: 'B', component: BComponent },
    { path: '**', component: AComponent }
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AComponent,
    BComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```



```html
//app.component.html
<div >
  <app-nav></app-nav>
</div>
<div class=' col-lg-12 body-content'>
  <router-outlet></router-outlet>
</div>
```



```html
//nav.component.html
<a class="nav-item nav-link" [routerLink]="['A']" >A</a>
<label> - </label>
<a class="nav-item nav-link" [routerLink]="['B']" >B</a>
```


To make a nice looking navbar use bootstrap.
```bash
npm install --save jquery
npm install --save bootstrap

```

Replace this (Inside the "build": {"options" area).
```json
//angular.json
"styles": [
  "src/styles.css"
],
"scripts": []
```

With this.
```json
//angular.json
"styles": [
  "src/styles.css",
  "./node_modules/bootstrap/dist/css/bootstrap.min.css"
],
"scripts": [
  "./node_modules/bootstrap/dist/js/bootstrap.min.js",
  "./node_modules/jquery/dist/jquery.min.js"
]
```



```html
//nav.component.html
<nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <a style="color:whitesmoke" class="navbar-brand">NaV</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" [routerLink]="['A']" [routerLinkActive]="['active']">A <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" [routerLink]="['B']" [routerLinkActive]="['active']">B</a>

    </div>
  </div>
</nav>

```



