import { Component, VERSION  } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  mytitle = 'my page title';
  name = `Angular! v${VERSION.full}`;

  constructor(private titleService: Title) {}


  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

}
