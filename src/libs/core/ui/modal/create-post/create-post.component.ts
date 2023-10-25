import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@core/ui';

export interface ICreatePostForm {
  title: FormControl<string>;
  description: FormControl<string>;
  images: FormControl<File[]>;
}

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent implements OnInit {
  readonly faImage = faImage;
  formCreate!: FormGroup<ICreatePostForm>;
  preview: string[] = [];

  ngOnInit(): void {
    this.createForm();
  }
  private createForm() {
    const file: File[] = []; // Giá trị ban đầu cho form control "preview"
    this.formCreate = new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      description: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      images: new FormControl(file, {
        nonNullable: true,
        validators: [Validators.maxLength(10)],
      }),
    });
    this.formCreate.valueChanges.subscribe((data) => {});
  }

  onInputFile(event: Event) {
    const files = Array.from(
      (event.target as HTMLInputElement).files as FileList
    ).filter((file) => file.type.includes('image/'));
    this.formCreate.controls.images.setValue(files);
    this.preview = [];
    Array.from(files).forEach((file) => {
      if (file && file.type.includes('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }
}
