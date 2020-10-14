import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {combineLatest} from 'rxjs';
import {first} from 'rxjs/operators';
import {MessageService} from 'primeng/api';

@Injectable()
export class AtlasService {
  public backendUrl = window['env']['backendUrl'];
  public creators = window['env']['creators'].split(',');
  public frontends = window['env']['frontends'].split(',');

  public tokens = [];
  public contentTypes = [];
  public uploads = [];
  public singletons = [];

  public activeFrontend = [];

  public principal;
  public loading = true;

  public blankContentType = {
    path: '',
    method: '',
    fields: [],
    body: []
  };

  public newContentType = {
    path: '',
    method: '',
    fields: [],
    body: []
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
    private router: Router,
    private messageService: MessageService
  ) {
    this.getPrincipal();
    this.getFrontend();
    this.getData();
  }

  public saveWebsite(name) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authtoken: this.principal.token
      })
    };
    this.http.post(this.backendUrl + '/services/website', {name}, httpOptions).subscribe(res => {
      this.getData();
    });
  }

  public saveContenTypeBody(id, body) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authtoken: this.principal.token
      })
    };
    const contentType = this.contentTypes.find(i => i.id === id);
    const payload = {
      action: 'update',
      method: contentType.method,
      path: contentType.path,
      body: body
    };
    this.http.post(this.backendUrl + '/data', payload, httpOptions).subscribe(res => {
      this.contentTypes = res as any[];
    });
  }

  public saveContentType(id?) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authtoken: this.principal.token
      })
    };
    if (id) {
      const payload = {
        action: 'updateFields',
        fields: this.activeContentType.fields,
        method: this.activeContentType.method,
        path: this.activeContentType.path
      };
      this.http.post(this.backendUrl + '/data', payload, httpOptions).subscribe(res => {
        this.contentTypes = res as any[];
      });
    } else {
      const payload = {
        action: 'add',
        body: [],
        fields: this.activeContentType.fields,
        method: this.activeContentType.method,
        path: this.activeContentType.path,
        creator: this.principal.user,
        usedBy: this.activeFrontend.join(),
      };
      console.log(payload);
      this.http.post(this.backendUrl + '/data', payload).subscribe(res => {
        this.contentTypes = res as any[];
      });
      this.newContentType = this.blankContentType;
    }
  }

  public deleteContentType(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        authtoken: this.principal.token
      })
    };
    const payload = {
      action: 'delete',
      method: this.contentTypes.find(i => i.id === id).method,
      path: this.contentTypes.find(i => i.id === id).path,
    };
    this.http.post(this.backendUrl + '/data/', payload, httpOptions, ).subscribe(res => {
      this.getData();
      this.router.navigate(['/dashboard']).then();
    });
  }

  public getData() {
    if (this.principal && this.principal.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          authtoken: this.principal.token
        })
      };
      combineLatest(
        this.http.get(this.backendUrl + '/data', httpOptions),
        this.http.get(this.backendUrl + '/services/uploads', httpOptions)
      ).subscribe(([contentTypes, uploads]) => {
        console.log('contentTypes', contentTypes);
        console.log('uploads', uploads);
        this.contentTypes = contentTypes as any[];
        this.uploads = uploads as any[];
        this.loading = false;
      }, error => {
        alert('The backend did not respond. Is it running?');
      });
    }
  }

  public getContent(id) {
    if (this.principal && this.principal.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          authtoken: this.principal.token
        })
      };
      const slug = this.contentTypes.find(i => i.id === id).path;
      return this.http.get(this.backendUrl + '/services/' + slug, httpOptions);
    }
  }

  public saveContent(path, payload) {
    if (this.principal && this.principal.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          authtoken: this.principal.token
        })
      };
      this.http.post(this.backendUrl + '/services/' + path, payload, httpOptions).subscribe(() => {
        this.getData();
      });
    }
  }

  public upload(formData) {
    if (this.principal && this.principal.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          authtoken: this.principal.token
        })
      };
      this.http.post(this.backendUrl + '/services/uploads/1', formData, httpOptions).subscribe(() => {
        this.getData();
      }, error => {
        this.messageService.add({severity: 'warn', summary: 'File size too large', detail: 'Try uploading a smaller file.'});
      });
    }
  }

  public deleteUpload(id) {
    if (this.principal && this.principal.token) {
      const httpOptions = {
        headers: new HttpHeaders({
          authtoken: this.principal.token
        })
      };
      this.http.delete(this.backendUrl + '/services/uploads/' + id, httpOptions).subscribe(() => {
        this.getData();
      });
    }
  }

  public auth(username, password) {
    return this.http.post(this.backendUrl + '/services/auth/login', {username, password});
  }

  public getFilteredEndpoints() {
    if (this.activeFrontend.length === 0) {
      return this.contentTypes;
    } else {
      return this.contentTypes.filter(i => i.usedBy.length === 0 || this.activeFrontend.some(r => i.usedBy.includes(r)));
    }
  }

  public setPrincipal(principal) {
    this.principal = principal;
    try {
      localStorage.setItem('principal', JSON.stringify(principal));
    } catch (e) {
      return;
    }
    this.getData();
  }

  public setFrontend() {
    try {
      localStorage.setItem('frontend', this.activeFrontend.join());
    } catch (e) {
      return;
    }
  }

  public getFrontend() {
    try {
      this.activeFrontend = localStorage.getItem('frontend').split(',');
      if (this.activeFrontend[0] === '') {
        this.activeFrontend = [];
      }
    } catch (e) {
      this.activeFrontend = [];
      return;
    }
  }

  public getPrincipal() {
    try {
      this.principal = JSON.parse(localStorage.getItem('principal'));
      if (!this.principal) {
        this.router.navigate(['/login']).then();
        this.loading = false;
      }
    } catch (e) {
      return;
    }
  }

  public camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  public decamelize(str) {
    const result = str.replace( /([A-Z])/g, ' $1' );
    return result.charAt(0).toUpperCase() + result.slice(1);
  }
}
