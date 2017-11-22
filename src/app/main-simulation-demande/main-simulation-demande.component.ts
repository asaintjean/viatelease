import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-simulation-demande',
  templateUrl: './main-simulation-demande.component.html',
  styleUrls: ['./main-simulation-demande.component.css']
})
export class MainSimulationDemandeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Simulation demande');
  }

}
