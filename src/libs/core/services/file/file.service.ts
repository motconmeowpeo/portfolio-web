import { Injectable } from '@angular/core';
import { HttpService } from '../http';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpService, private storage: Storage) {}

  upload(files: File[]) {
    // return combineLatest(files.map((file) => this.uploadFile(file)));
    files.map((file) => this.uploadFile(file));
  }

  // private uploadFile(file: File) {
  //   return this.http.put<File>(`${API_UPLOAD}${file.name}`, file);
  // }
  private uploadFile(file: File) {
    const storageRef = ref(this.storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return uploadTask.on(
      'state_changed',
      (snap) => console.log('Uploading....'),
      () => console.log('Uploaded.....')
    );
  }
}
