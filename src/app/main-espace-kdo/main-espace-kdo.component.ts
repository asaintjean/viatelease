import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-espace-kdo',
  templateUrl: './main-espace-kdo.component.html',
  styleUrls: ['./main-espace-kdo.component.css']
})
export class MainEspaceKdoComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Espace KDO');
  }

}
