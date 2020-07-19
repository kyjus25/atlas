import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AtlasService} from '../../shared/atlas.service';
import {Confirmation, ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.css']
})
export class CreateTypeComponent {

  public mode = 'new';

  public name;
  public icon = 'Select Icon';

  constructor(
    private route: ActivatedRoute,
    public atlas: AtlasService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.route.params.subscribe(params => {
      if (params && params.id) {
        console.log('id', params.id);
        console.log('all content types', this.atlas.contentTypes);
        this.atlas.activeContentType = this.atlas.contentTypes.find(ct => ct.id === params.id);
        console.log('active', this.atlas.activeContentType);
        this.name = this.atlas.activeContentType.name;
        this.icon = this.atlas.activeContentType.icon;
        this.mode = 'edit';
      } else {
        this.atlas.activeContentType = this.atlas.newContentType;
      }
    });
  }

  public addField() {
    this.router.navigate(['./field'], {relativeTo: this.route}).then();
  }

  public submit() {
    this.atlas.activeContentType.icon = this.icon;
    this.atlas.activeContentType.name = this.name;
    if (this.mode === 'new') {
      this.atlas.saveContentType();
    } else {
      this.atlas.saveContentType(this.atlas.activeContentType.id);
    }
    this.messageService.add({severity: 'success', summary: null, detail: 'Content Type Saved'});
  }

  public delete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.atlas.deleteContentType(this.atlas.activeContentType.id);
      }
    });
  }
}
