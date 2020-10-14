import { Component } from '@angular/core';
import {AtlasService} from '../../shared/atlas.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.css']
})
export class CreateFieldComponent {

  constructor(
    public atlas: AtlasService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  public activeFieldType = 'string';
  public label: '';
  public required = true;
  public multiselect = false;
  public options = '';

  public submit() {
    if (this.label && this.label !== '') {
      this.atlas.activeContentType.fields.push({
        label: this.label,
        multiselect: this.multiselect,
        options: this.options.split('\n'),
        type: this.activeFieldType,
        required: this.required
      });
      this.router.navigate(['../'], {relativeTo: this.route}).then();
    } else {
      this.messageService.add({severity: 'warn', summary: 'One or more fields empty', detail: 'Please make sure all fields are filled out.'});
    }
  }
}
