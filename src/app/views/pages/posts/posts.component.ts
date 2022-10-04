import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import * as customBuild from '../../../shared/ckCustomBuild/build/ckeditor.js';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  form = this.fb.group({
    description: '',
  })
  public Editor = customBuild;
  @Input() config = {

    toolbar: {
      items: [
        'textPartLanguage',
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'alignment',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'undo',
        'redo',
        'mediaEmbed'
      ]
    },
    image: {
      styles: [
        'alignLeft', 'alignCenter', 'alignRight'
      ],
      resizeOptions: [
        {
          name: 'resizeImage:original',
          label: 'Original',
          value: null
        },
        {
          name: 'resizeImage:50',
          label: '25%',
          value: '25'
        },
        {
          name: 'resizeImage:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'resizeImage:75',
          label: '75%',
          value: '75'
        }
      ],
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'ImageResize',
        '|',
        'imageTextAlternative'
      ]
    },
    mediaEmbed: {
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'ImageResize',
        '|',
        'imageTextAlternative'
      ],
      previewsInData: true
    },
    language: {
      ui: 'en',
      content: 'en',
      textPartLanguage: [
        { title: 'Arabic', languageCode: 'ar' },
        { title: 'English', languageCode: 'en' }
      ],
    },
  };

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    console.log(form);
  }

}
