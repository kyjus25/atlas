import { Component } from '@angular/core';
import {AtlasService} from './shared/atlas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public atlas: AtlasService
  ) {}
}
