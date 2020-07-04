import { Component } from '@angular/core';
import {AtlasService} from '../../shared/atlas.service';

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.css']
})
export class CreateFieldComponent {

  constructor(public data: AtlasService) {}

  public activeFieldType = 'string';

  public checked = true;

  public multiselect = false;
}
