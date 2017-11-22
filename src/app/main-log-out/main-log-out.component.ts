import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-log-out',
  templateUrl: './main-log-out.component.html',
  styleUrls: ['./main-log-out.component.css']
})
export class MainLogOutComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Déconnexion');
  }

}
