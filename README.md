```
ng new FrontEnd
```



Remove
```json
//launchSettings.json
"launchUrl": "api/values",
```

```cs
//ValuesController.cs
```


Include HttpClient component.
```ts
//app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


Include in Component and place in constructor.
```ts
//app.component.ts
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {

}
```

Taken from dotnet project:
```json
//launchSettings.json
"applicationUrl": "http://localhost:11703"
```

Place into FrontEnd
```ts
//app.component.ts
private BASE_URL = "http://localhost:11703";
```


Get method in BackEnd returns array of strings.
```c#
//ValuesController.cs
[HttpGet]
public ActionResult <IEnumerable<string>> Get()
{
    return new string[] { "value1", "value2" };
}
```


Perform Get request in FrontEnd. Will get an Array.
```ts
constructor(private http: HttpClient) {

    this.http.get(this.BASE_URL + "/api/Values").subscribe(res => {
        console.log(res);
    });

}
```


Can have complex types.

Receive "Data" type from FrontEnd.
```c#
//ValuesController.cs
public class Data
{
    public string Item1 { get; set; }
    public int Item2 { get; set; }

}

[HttpPost("Class")]
public void Post([FromBody] Data d)
{
}
```


Send "Data" type from FrontEnd.
```ts
//app.component.ts

class TypescriptData {
  item1: string = "asdf";
  item2: number = 17;
}

private outdata = new TypescriptData();

this.http.post(this.BASE_URL + "/api/Values/Class", this.outdata).subscribe(res => {
    console.log(res);
});
```



```
```



```
```



