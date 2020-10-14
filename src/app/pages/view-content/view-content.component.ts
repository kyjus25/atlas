import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AtlasService} from '../../shared/atlas.service';
import {Confirmation, ConfirmationService, MessageService} from 'primeng/api';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-view-content',
  templateUrl: './view-content.component.html',
  styleUrls: ['./view-content.component.css']
})
export class ViewContentComponent {

  public contentType;
  public data: any[] = [];
  public code;

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
        this.atlas.getContent(params.id).pipe(map(i => i as any[])).subscribe(content => {
          console.log('DATA', content);
          this.data = content;
          this.code = JSON.stringify(content, null, '   ');
        });
      }
    });
  }

  public addContent() {
    this.router.navigate(['./add'], {relativeTo: this.route}).then();
  }

  public submit() {
    const payload = JSON.parse(this.code);
    this.atlas.saveContenTypeBody(this.contentType.id, payload);
    this.messageService.add({severity: 'success', summary: null, detail: 'Endpoint Saved'});
  }

  public checkMonaco() {
    try {
      JSON.parse(this.code);
    } catch (e) {
      return true;
    }
    return false;
  }

  public getKeys(obj) {

  }

  // public submit() {
  //   this.display = false;
  //   this.atlas.saveWebsite(this.name);
  //   this.messageService.add({severity: 'success', summary: null, detail: 'Website Saved'});
  // }

  // public delete() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure that you want to perform this action?',
  //     accept: () => {
  //       this.atlas.deleteContentType(this.atlas.activeContentType.id);
  //     }
  //   });
  // }
}
