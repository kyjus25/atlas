import { Component } from '@angular/core';
import {AtlasService} from '../atlas.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    public atlas: AtlasService
  ) {}
}
