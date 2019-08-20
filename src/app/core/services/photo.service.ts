import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Photo } from '../../shared/models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly apiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.apiUrl = `${environment.apiUrl}/api/Photos`;
  }

  private convertFileToBytes(file: File) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    return new Promise(res => {
      fileReader.onloadend = () => res(fileReader.result);
    });
  }

  public async uploadPhoto(photo: File) {
    const uploadedPicture = await this.convertFileToBytes(photo);
    return this.http.post<Photo>(this.apiUrl, { uploadedPicture });
  }
}
