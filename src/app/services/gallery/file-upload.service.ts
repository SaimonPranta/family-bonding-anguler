import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UtilsService} from '../core/utils.service';
import {ImageUploadResponse, ResponsePayload} from '../../interfaces/core/response-payload.interface';

const API_UPLOAD = environment.ftpBaseLink + '/api/upload/';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private httpClient: HttpClient,
    private utilsService: UtilsService,
  ) {
  }


  /**
   * UPLOAD IMAGE
   */

  uploadSingleImage(fileData: any) {
    const data = new FormData();
    data.append('folderPath', fileData.folderPath);
    data.append('image', fileData.file, fileData.fileName);
    return this.httpClient.post<{ message: string, downloadUrl: string }>(API_UPLOAD + 'single-image-original', data);

  }

  uploadSingleConvertToMulti(fileData: string, fileName?: string) {
    const data = new FormData();
    data.append('productImage', fileData, fileName);
    return this.httpClient.post<{ images: object }>(API_UPLOAD + 'single-image-to-multi-convert', data);

  }

  uploadMultiImageOriginal(files: File[]) {
    const data = new FormData();
    files.forEach(f => {
      const fileName = this.utilsService.getImageName(f.name) + this.utilsService.getRandomInt(100, 5000) + '.' + f.name.split('.').pop();
      data.append('imageMulti', f);
    });
    return this.httpClient.post<ImageUploadResponse[]>(API_UPLOAD + 'multiple-image', data);

  }


  /**
   * REMOVE IMAGE
   */

  deleteMultipleFile(data: string[]) {
    return this.httpClient.post<ResponsePayload>(API_UPLOAD + 'delete-multiple-image', {url: data});
  }

  removeSingleFile(url: string) {
    return this.httpClient.post<{ message: string }>(API_UPLOAD + 'remove-file-single', {url});
  }


}
