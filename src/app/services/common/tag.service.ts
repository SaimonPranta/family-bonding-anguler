import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Tag} from '../../interfaces/common/tag.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_TAG = environment.apiBaseLink + '/api/tag/';


@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addTag
   * insertManyTag
   * getAllTags
   * getTagById
   * updateTagById
   * updateMultipleTagById
   * deleteTagById
   * deleteMultipleTagById
   */

  addTag(data: Tag) {
    return this.httpClient.post<ResponsePayload>
    (API_TAG + 'add', data);
  }

  insertManyTag(data: Tag, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_TAG + 'insert-many', mData);
  }

  getAllTags(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Tag[], count: number, success: boolean }>(API_TAG + 'get-all', filterData, {params});
  }

  getTagById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Tag, message: string, success: boolean }>(API_TAG + id, {params});
  }

  updateTagById(id: string, data: Tag) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_TAG + 'update/' + id, data);
  }

  updateMultipleTagById(ids: string[], data: Tag) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_TAG + 'update-multiple', mData);
  }

  deleteTagById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_TAG + 'delete/' + id, {params});
  }

  deleteMultipleTagById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_TAG + 'delete-multiple', {ids: ids}, {params});
  }


}
