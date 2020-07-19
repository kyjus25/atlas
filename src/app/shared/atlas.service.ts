import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable()
export class AtlasService {

  public backendUrl = 'http://localhost:8080';

  public me;
  public contentTypes = [];
  public singletons = [];

  public token;
  public loading = true;

  public blankContentType = {
    name: '',
    icon: '',
    fields: []
  };

  public newContentType = {
    name: '',
    icon: '',
    fields: []
  };

  public activeContentType;

  public fields = [
    {
      icon: 'Ab',
      name: 'String',
      desc: 'Plain text input.'
    },
    {
      icon: '123',
      name: 'Number',
      desc: 'Numbers only, please.'
    },
    {
      icon: 'fas fa-paragraph',
      name: 'WYSIWYG',
      desc: 'Full text editor.'
    },
    {
      icon: 'fas fa-eye-dropper',
      name: 'Color',
      desc: 'Pick a color, any color.'
    },
    {
      icon: 'fas fa-tasks',
      name: 'Select',
      desc: 'Make your choice.'
    },
    {
      icon: 'fas fa-toggle-on',
      name: 'Boolean',
      desc: 'True or false. Yes or no.'
    },
    {
      icon: 'fas fa-image',
      name: 'Image',
      desc: 'A place to upload puppy pics.'
    },
    {
      icon: '{}',
      name: 'JSON',
      desc: 'For you coders out there.'
    },
    {
      icon: 'fas fa-align-left',
      name: 'Textarea',
      desc: 'Plain textarea input.'
    },
    {
      icon: 'fas fa-link',
      name: 'Relation',
      desc: 'Link this to something else.'
    },
    {
      icon: 'fas fa-calendar',
      name: 'Date',
      desc: 'Select a date.'
    },
  ];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.getToken();
    this.getData();
  }

  public saveContentType(id?) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authtoken: this.token
      })
    };
    if (id) {
      this.http.put(this.backendUrl + '/services/contentType/' + id, this.activeContentType, httpOptions).subscribe(res => {
        this.getData();
      });
    } else {
      this.http.post(this.backendUrl + '/services/contentType', this.activeContentType, httpOptions).subscribe(res => {
        this.newContentType = this.blankContentType;
        this.getData();
      });
    }
  }

  public deleteContentType(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authtoken: this.token
      })
    };
    this.http.delete(this.backendUrl + '/services/contentType/' + id, httpOptions).subscribe(res => {
      this.getData();
      this.router.navigate(['/dashboard']).then();
    });
  }

  public getData() {
    if (this.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          authtoken: this.token
        })
      };
      combineLatest(
        this.http.get(this.backendUrl + '/services/user/me', httpOptions),
        this.http.get(this.backendUrl + '/services/contentType', httpOptions),
      ).subscribe(([me, contentTypes]) => {
        console.log('me', me);
        console.log('contentTypes', contentTypes);
        this.me = me;
        this.contentTypes = contentTypes as any[];
        this.loading = false;
      });
    }
  }

  public auth(username, password) {
    return this.http.post(this.backendUrl + '/services/auth/login', {username, password});
  }

  public setToken(token) {
    this.token = token;
    try {
      localStorage.setItem('token', token);
    } catch (e) {
      return;
    }
    this.getData();
  }

  public getToken() {
    try {
      this.token = localStorage.getItem('token');
      if (!this.token) {
        this.router.navigate(['/login']).then();
        this.loading = false;
      }
    } catch (e) {
      return;
    }
  }
}
