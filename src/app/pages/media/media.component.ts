import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AtlasService} from '../../shared/atlas.service';
import {Confirmation, ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-websites',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent {

  public display = false;

  public name;

  constructor(
    private route: ActivatedRoute,
    public atlas: AtlasService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  public upload(event, input) {
    const formData = new FormData();
    formData.append('file', event[0]);
    this.atlas.upload(formData);
  }

  public delete(id) {
    this.atlas.deleteUpload(id);
  }
}
