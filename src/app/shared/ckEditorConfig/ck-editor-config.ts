export const editorConfig = {

  toolbar: {
    items: [
      'heading',
      '|',
      'fontColor',
      'fontBackgroundColor',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageInsert',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
    ]
  },
  language: 'en',
  fontColor: {
    colors: [
      "black","gray","silver",{color:"white",hasBorder:!0},"maroon","red","purple","fuchsia","green","lime","olive","yellow","navy","blue","teal","aqua"
    ],
    columns:4,
  },
  fontBackgroundColor: {
    colors:[
      "hsl(0,0%,0%)","hsl(0,0%,12.5%)","hsl(0,0%,25%)","hsl(0,0%,37.5%)","hsl(0,0%,50%)","hsl(0,0%,62.50%)","hsl(0,0%,75%)","hsl(0,0%,87.5%)",{color:"hsl(0,0%,100%)",hasBorder:!0},"hsl(0,100%,10%)","hsl(0,100%,20%)","hsl(0,100%,30%)","hsl(0,100%,40%)","hsl(0,100%,50%)","hsl(0,100%,60%)","hsl(0,100%,70%)","hsl(0,100%,80%)",{color:"hsl(0,100%,90%)",hasBorder:!0},"hsl(30,100%,10%)","hsl(30,100%,20%)","hsl(30,100%,30%)","hsl(30,100%,40%)","hsl(30,100%,50%)","hsl(30,100%,60%)","hsl(30,100%,70%)","hsl(30,100%,80%)",{color:"hsl(30,100%,90%)",hasBorder:!0},"hsl(60,100%,10%)","hsl(60,100%,20%)","hsl(60,100%,30%)","hsl(60,100%,40%)","hsl(60,100%,50%)","hsl(60,100%,60%)","hsl(60,100%,70%)","hsl(60,100%,80%)",{color:"hsl(60,100%,90%)",hasBorder:!0},"hsl(90,100%,10%)","hsl(90,100%,20%)","hsl(90,100%,30%)","hsl(90,100%,40%)","hsl(90,100%,50%)","hsl(90,100%,60%)","hsl(90,100%,70%)","hsl(90,100%,80%)",{color:"hsl(90,100%,90%)",hasBorder:!0},"hsl(120,100%,10%)","hsl(120,100%,20%)","hsl(120,100%,30%)","hsl(120,100%,40%)","hsl(120,100%,50%)","hsl(120,100%,60%)","hsl(120,100%,70%)","hsl(120,100%,80%)",{color:"hsl(120,100%,90%)",hasBorder:!0},"hsl(150,100%,10%)","hsl(150,100%,20%)","hsl(150,100%,30%)","hsl(150,100%,40%)","hsl(150,100%,50%)","hsl(150,100%,60%)","hsl(150,100%,70%)","hsl(150,100%,80%)",{color:"hsl(150,100%,90%)",hasBorder:!0},"hsl(180,100%,10%)","hsl(180,100%,20%)","hsl(180,100%,30%)","hsl(180,100%,40%)","hsl(180,100%,50%)","hsl(180,100%,60%)","hsl(180,100%,70%)","hsl(180,100%,80%)",{color:"hsl(180,100%,90%)",hasBorder:!0},"hsl(210,100%,10%)","hsl(210,100%,20%)","hsl(210,100%,30%)","hsl(210,100%,40%)","hsl(210,100%,50%)","hsl(210,100%,60%)","hsl(210,100%,70%)","hsl(210,100%,80%)",{color:"hsl(210,100%,90%)",hasBorder:!0},"hsl(240,100%,10%)","hsl(240,100%,20%)","hsl(240,100%,30%)","hsl(240,100%,40%)","hsl(240,100%,50%)","hsl(240,100%,60%)","hsl(240,100%,70%)","hsl(240,100%,80%)",{color:"hsl(240,100%,90%)",hasBorder:!0},"hsl(270,100%,10%)","hsl(270,100%,20%)","hsl(270,100%,30%)","hsl(270,100%,40%)","hsl(270,100%,50%)","hsl(270,100%,60%)","hsl(270,100%,70%)","hsl(270,100%,80%)",{color:"hsl(270,100%,90%)",hasBorder:!0},"hsl(300,100%,10%)","hsl(300,100%,20%)","hsl(300,100%,30%)","hsl(300,100%,40%)","hsl(300,100%,50%)","hsl(300,100%,60%)","hsl(300,100%,70%)","hsl(300,100%,80%)",{color:"hsl(300,100%,90%)",hasBorder:!0},"hsl(330,100%,10%)","hsl(330,100%,20%)","hsl(330,100%,30%)","hsl(330,100%,40%)","hsl(330,100%,50%)","hsl(330,100%,60%)","hsl(330,100%,70%)","hsl(330,100%,80%)",{color:"hsl(330,100%,90%)",hasBorder:!0}
    ],
    columns:9,
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
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'linkImage',
      '|',
      'ImageResize',
      '|',
      'imageTextAlternative',
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  }
};
