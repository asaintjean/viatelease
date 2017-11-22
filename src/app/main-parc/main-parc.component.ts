import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-parc',
  templateUrl: './main-parc.component.html',
  styleUrls: ['./main-parc.component.css']
})
export class MainParcComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Mon parc');
  }

}
