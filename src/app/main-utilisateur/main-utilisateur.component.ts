import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-utilisateur',
  templateUrl: './main-utilisateur.component.html',
  styleUrls: ['./main-utilisateur.component.css']
})
export class MainUtilisateurComponent implements OnInit {
  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Mon compte');
  }

}
