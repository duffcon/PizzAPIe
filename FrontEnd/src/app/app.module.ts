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
