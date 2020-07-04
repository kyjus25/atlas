import {Injectable} from '@angular/core';

@Injectable()
export class AtlasService {

  public contentTypes = [];
  public singletons = [];

  public newContentType = {};


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

  constructor() {
    console.log('initialized');
  }
}
