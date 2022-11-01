import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FileInputComponent),
    }
  ]
})

export class FileInputComponent implements OnInit {
  @Input() data;
  @Input() control: AbstractControl = new FormControl();
  public form = this.fb.group({
    file: ['']
  });
  public image: any;
  public imageValue: any;
  constructor(private fb: FormBuilder) { }

  onChange: any = () => {}
  onTouch: any = () => {}
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  writeValue(input: any) {
    if (input) {
      this.onChange(input);
      this.onTouch();
    }
  }

  ngOnInit(): void {
  }
  onChangeInput(e) {
    if (e.target.files[0]) {
      const fileName = e.target.files[0].name;
      if (/\.(jpe?g|png|bmp)$/i.test(fileName)) {
        const filesize = e.target.files[0].size;
        if (filesize > 15728640) {
          this.control.setErrors({size: 'error'});
        } else {
          let reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = () => {
            this.imageValue = reader.result;
          };
          this.image = e.target.files[0];
          this.onChange(this.image);
          this.onTouch();
        }
      } else {
        this.control.setErrors({type: 'error'});
      }
    } else {
      this.imageValue = undefined;
      this.onChange(null);
      this.onTouch();
      this.control.setErrors(this.control.errors);
    }

    console.log(this.control?.hasError('type'));
    console.log(this.form?.dirty);
    console.log(this.form?.touched);
  }
}
