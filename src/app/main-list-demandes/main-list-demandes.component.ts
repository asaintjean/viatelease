import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-list-demandes',
  templateUrl: './main-list-demandes.component.html',
  styleUrls: ['./main-list-demandes.component.css']
})
export class MainListDemandesComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Liste des demandes');
  }

}
