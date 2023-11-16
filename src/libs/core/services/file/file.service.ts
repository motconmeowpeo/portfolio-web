import { Injectable } from '@angular/core';
import { HttpService } from '../http';
import { Storage, deleteObject, ref, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpService, private storage: Storage) { }

  async upload(files: File[]) {
    // return combineLatest(files.map((file) => this.uploadFile(file)));
    const result = await Promise.all(files.map((file) => this.uploadFile(file)));
    return result;
  }

  // private uploadFile(file: File) {
  //   return this.http.put<File>(`${API_UPLOAD}${file.name}`, file);
  // }

  async delete(urls: string[]) {
    const result = await urls.map((url) => this.deleteFile(url))
    return result;
  }

  private uploadFile(file: File) {
    const storageRef = ref(this.storage, file.name);
    return uploadBytes(storageRef, file);
  }

  private deleteFile(url: string) {
    const storageRef = ref(this.storage, url);
    return deleteObject(storageRef)
  }
}
