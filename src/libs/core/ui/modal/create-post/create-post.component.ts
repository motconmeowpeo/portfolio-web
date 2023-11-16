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
import { Subject, catchError, delay, interval, tap, timer } from 'rxjs';
import { FileService } from '@core/services/file';
import { URL_IMAGE } from '@core/constants';
import { AuthFacade } from '@core/services/auth';
import { LoadingSmallComponent } from '@core/components/loading-small';
import { IPost } from '@core/models';

export interface ICreatePostForm {
  title: FormControl<string>;
  description: FormControl<string>;
  images: FormControl<File[]>;
}

export interface IData {
  post: IPost,
  textSubmit: string
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
    LoadingSmallComponent
  ],
  templateUrl: './create-post.component.html',
})
export class CreatePostComponent implements OnInit, OnDestroy {
  readonly faImage = faImage;
  readonly URL_IMAGE = URL_IMAGE;

  formCreate!: FormGroup<ICreatePostForm>;
  preview: string[] = [];
  sanitizedHtml!: SafeHtml;
  isLoading = false;
  user$ = this.authFacade.user$;
  unsubscribe$ = new Subject<void>();

  // Function to sanitize HTML
  get data(): IData {
    return this.dialogRef?.data
  }

  ngOnInit(): void {
    this.createForm();
  }

  constructor(
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
    private dialog: DialogService,
    private dialogRef: DialogRef,
    private postFacade: PostFacade,
    private authFacade: AuthFacade,
    private fileService: FileService
  ) { }

  ngOnDestroy(): void {
    this.cd.detectChanges();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private createForm() {
    const file: File[] = []; // Giá trị ban đầu cho form control "preview"
    this.formCreate = new FormGroup({
      title: new FormControl(this.data?.post.title || '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9\s]+$/),
        ],
        updateOn: 'change',
      }),
      description: new FormControl(this.data?.post.description || '<p>Hello, world!</p>', {
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

  async submitPost() {
    this.isLoading = true;
    if (!this.data) {
      await this.fileService.upload(this.formCreate.controls.images.value);
      this.user$.subscribe((user) => {
        if (user) {
          this.createPost(user.username);
        }
      });
    }
    else {
      await this.fileService.upload(this.formCreate.controls.images.value);
      this.user$.subscribe((user) => {
        if (user) {
          this.updatePost();
        }
      });
    }

  }

  close() {
    this.dialogRef.close();
  }

  createPost(createBy: string) {
    const images = this.formCreate.controls.images.value.map(
      (file) => file.name
    );

    this.postFacade
      .create({ ...this.formCreate.value, images, createBy })
      .pipe(
        tap(() => {
          this.close();
        }),
        catchError((er) => {
          this.close();
          return er;
        })
      )
      .subscribe();
  }

  async updatePost() {
    const images = this.formCreate.controls.images.value.map(
      (file) => file.name
    );
    const currentImages = this.data.post.images?.filter((img) => !images.includes(img)) || []
    this.postFacade
      .update({ ...this.formCreate.value, images, id: this.data.post.id })
      .pipe(
        tap(() => {
          this.fileService.delete(currentImages)
          this.close();
        }),
        catchError((er) => {
          this.close();
          return er;
        })
      )
      .subscribe();
  }
}
