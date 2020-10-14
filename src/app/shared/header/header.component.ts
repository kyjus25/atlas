import { Component } from '@angular/core';
import {AtlasService} from '../atlas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public mappedFrontends = [];
  constructor(
    public atlas: AtlasService
  ) {
    this.atlas.frontends.forEach(i => {
      this.mappedFrontends.push({
        label: i,
        value: i
      });
    });
  }
}
