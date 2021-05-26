import { Component, OnInit } from '@angular/core';

declare var name: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'consulta-medica';
  public isMenuCollapsed=true;
  public isFirst=true;

  ngOnInit(): void {
    new name();
  }
}
