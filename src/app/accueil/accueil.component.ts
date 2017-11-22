import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  constructor(private titleService: Title) { }


  ngOnInit() {
    this.titleService.setTitle('Accueil');
  }

}
