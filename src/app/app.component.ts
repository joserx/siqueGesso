import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sique-gesso';

  loader = true;

  constructor() { }

  ngOnInit(): void {
    window.onload = (event: any) => {

      setTimeout(() =>{this.loader = false;}, 1000)
    };
  }

}
