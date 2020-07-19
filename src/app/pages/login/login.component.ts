import { Component } from '@angular/core';
import {AtlasService} from '../../shared/atlas.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username;
  public password;

  constructor(
    private atlas: AtlasService,
    private messageService: MessageService,
    private router: Router
  ) {}

  public submit() {
    this.atlas.auth(this.username, this.password).subscribe(res => {
      this.atlas.setToken(res.token);
      this.router.navigate(['/dashboard']).then();
    }, error => {
      this.messageService.add({severity: 'error', summary: 'An error occured', detail: error.error.error});
    });
  }
}
