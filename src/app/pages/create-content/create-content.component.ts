import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AtlasService} from '../../shared/atlas.service';
import {Confirmation, ConfirmationService, MessageService} from 'primeng/api';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent {

  public mode = 'new';
  public contentType;
  public data: any[] = [];

  public formData = {published: true};

  constructor(
    private route: ActivatedRoute,
    public atlas: AtlasService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.route.params.subscribe(params => {
      if (params && params.id) {
        this.contentType = atlas.contentTypes.find(i => i.id === params.id);
        console.log(this.contentType);
        if (this.contentType.fields.length === 0) {
          this.formData['unconfigured'] = '{\n\t"test": "Your object here."\n}';
        }
      }
    });
  }

  public submit() {
    console.log(this.formData);
    this.atlas.saveContent(this.contentType.path, this.formData);
    this.router.navigate(['../'], {relativeTo: this.route}).then();
    this.messageService.add({severity: 'success', summary: null, detail: this.contentType.name + ' Saved'});
  }

  public delete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.atlas.deleteContentType(this.atlas.activeContentType.id);
      }
    });
  }

  public getOptions(options) {
    console.log('options', options);
    const res = [];
    return options.forEach(i => res.push({label: i, value: i}));
  }
}
