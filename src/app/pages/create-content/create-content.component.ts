import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AtlasService} from '../../shared/atlas.service';
import {Confirmation, ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent {

  constructor(
    private route: ActivatedRoute,
    public atlas: AtlasService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

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
