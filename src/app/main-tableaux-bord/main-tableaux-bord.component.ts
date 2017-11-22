import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-tableaux-bord',
  templateUrl: './main-tableaux-bord.component.html',
  styleUrls: ['./main-tableaux-bord.component.css']
})
export class MainTableauxBordComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Tableau de bord');
  }

}
