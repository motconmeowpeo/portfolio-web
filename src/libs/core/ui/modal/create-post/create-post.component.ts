import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
import { CKEditorModule } from 'ckeditor4-angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DialogCloseDirective, DialogRef, DialogService } from '@ngneat/dialog';
import { PostFacade } from '@core/services/post';
import { interval, tap, timer } from 'rxjs';
import { FileService } from '@core/services/file';
import { URL_IMAGE } from '@core/constants';

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
    CKEditorModule,
  ],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent implements OnInit, OnDestroy {
  readonly faImage = faImage;
  formCreate!: FormGroup<ICreatePostForm>;
  preview: string[] = [];
  sanitizedHtml!: SafeHtml;
  isLoading = false;

  // Function to sanitize HTML

  ngOnInit(): void {
    this.createForm();
  }

  constructor(
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
    private dialog: DialogService,
    private dialogRef: DialogRef,
    private postFacade: PostFacade,
    private fileService: FileService
  ) {}

  ngOnDestroy(): void {
    this.cd.detectChanges();
  }
  private createForm() {
    const file: File[] = []; // Giá trị ban đầu cho form control "preview"
    this.formCreate = new FormGroup({
      title: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s]+$/),
        ],
        updateOn: 'change',
      }),
      description: new FormControl('<p>Hello, world!</p>', {
        nonNullable: true,
        validators: [Validators.required],
        updateOn: 'change',
      }),
      images: new FormControl(file, {
        nonNullable: true,
        validators: [Validators.maxLength(10)],
      }),
    });
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
          this.preview.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  submitPost() {
    this.isLoading = true;
    this.fileService.upload(this.formCreate.controls.images.value);

    timer(3000)
      .pipe(
        tap(() => {
          this.createPost();
        })
      )
      .subscribe();
  }

  close() {
    this.dialogRef.close();
  }

  createPost() {
    const images = this.formCreate.controls.images.value.map(
      (file) => file.name
    );
    this.postFacade
      .create({ ...this.formCreate.value, images })
      .pipe(
        tap(() => {
          this.close();
        })
      )
      .subscribe();
  }
}
