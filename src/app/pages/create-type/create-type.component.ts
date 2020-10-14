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

  public path;
  public methods = [
    {label: 'FULL', value: 'full'},
    {label: 'GET', value: 'get'},
    {label: 'PULL', value: 'pull'},
    {label: 'POST', value: 'post'},
    {label: 'DELETE', value: 'delete'},
  ];
  public method = 'full';

  constructor(
    private route: ActivatedRoute,
    public atlas: AtlasService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.route.params.subscribe(params => {
      if (params && params.id && params.id !== 'new') {
        console.log('id', params.id);
        console.log('all content types', this.atlas.contentTypes);
        this.atlas.activeContentType = this.atlas.contentTypes.find(ct => ct.id === params.id);
        if (this.atlas.activeContentType) {
          console.log('active', this.atlas.activeContentType);
          this.path = this.atlas.activeContentType.path;
          this.method = this.atlas.activeContentType.method;
          this.mode = 'edit';
        } else {
          this.router.navigate(['/dashboard']).then();
        }
      } else {
        this.atlas.activeContentType = this.atlas.newContentType;
      }
    });
  }

  public addField() {
    this.router.navigate(['./field'], {relativeTo: this.route}).then();
  }

  public submit() {
    this.atlas.activeContentType.method = this.method;
    this.atlas.activeContentType.path = this.path;
    this.atlas.activeContentType.creator = this.atlas.principal.user;
    this.atlas.activeContentType.usedBy = this.atlas.frontends[0];
    if (this.mode === 'new') {
      this.atlas.saveContentType();
      this.router.navigate(['/dashboard']).then();
    } else {
      this.atlas.saveContentType(this.atlas.activeContentType.id);
    }
    this.messageService.add({severity: 'success', summary: null, detail: 'Content Type Saved'});
  }

  public remove(i) {
    this.atlas.activeContentType.fields.splice(i, 1);
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
