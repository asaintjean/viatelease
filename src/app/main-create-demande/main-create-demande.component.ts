import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-create-demande',
  templateUrl: './main-create-demande.component.html',
  styleUrls: ['./main-create-demande.component.css']
})
export class MainCreateDemandeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Créer une demande');
  }

}
