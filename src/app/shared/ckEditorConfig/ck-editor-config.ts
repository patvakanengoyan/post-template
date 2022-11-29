export const editorConfig = {

  toolbar: {
    items: [
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
  },
};
