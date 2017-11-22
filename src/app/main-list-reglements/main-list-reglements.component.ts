import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-list-reglements',
  templateUrl: './main-list-reglements.component.html',
  styleUrls: ['./main-list-reglements.component.css']
})
export class MainListReglementsComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Liste des règlements');
  }

}
