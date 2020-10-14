import { Component } from '@angular/core';
import {AtlasService} from '../atlas.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  constructor(
    public atlas: AtlasService
  ) {}

  public help() {
    alert('I have no help to give you.');
  }

}
