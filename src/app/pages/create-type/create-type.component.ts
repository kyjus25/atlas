import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AtlasService} from '../../shared/atlas.service';

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.css']
})
export class CreateTypeComponent {

  public name;
  public icon = 'Select Icon';

  constructor(
    private route: ActivatedRoute,
    public atlas: AtlasService,
    private router: Router) {
  }
  public addField() {
    this.router.navigate(['./field'], {relativeTo: this.route}).then();
  }

  public submit() {
    const newContentType = this.atlas.newContentType;
    newContentType.icon = this.icon;
    newContentType.name = this.name;
    this.atlas.contentTypes.push(newContentType);
    this.atlas.newContentType = this.atlas.blankContentType;
  }
}
