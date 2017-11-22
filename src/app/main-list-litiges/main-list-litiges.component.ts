import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-list-litiges',
  templateUrl: './main-list-litiges.component.html',
  styleUrls: ['./main-list-litiges.component.css']
})
export class MainListLitigesComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Liste des litiges');
  }

}
