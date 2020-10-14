import { Component } from '@angular/core';
import {AtlasService} from '../../shared/atlas.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

export interface AuthReturn {
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public username = this.atlas.creators[0];
  public password;

  constructor(
    public atlas: AtlasService,
    private messageService: MessageService,
    private router: Router
  ) {}

  public submit() {
    this.atlas.setPrincipal({user: this.username, token: this.username});
    this.router.navigate(['/dashboard']).then();
  }
}
