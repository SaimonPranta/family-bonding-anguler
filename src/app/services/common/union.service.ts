import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Union} from '../../interfaces/common/union.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_BRAND = environment.apiBaseLink + '/api/union/';


@Injectable({
  providedIn: 'root'
})
export class UnionService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addUnion
   * insertManyUnion
   * getAllUnions
   * getUnionById
   * updateUnionById
   * updateMultipleUnionById
   * deleteUnionById
   * deleteMultipleUnionById
   */

  addUnion(data: Union) {
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'add', data);
  }

  insertManyUnion(data: Union, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'insert-many', mData);
  }

  getAllUnions(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Union[], count: number, success: boolean }>(API_BRAND + 'get-all', filterData, {params});
  }

  getUnionById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Union, message: string, success: boolean }>(API_BRAND + id, {params});
  }

  updateUnionById(id: string, data: Union) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  updateMultipleUnionById(ids: string[], data: Union) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BRAND + 'update-multiple', mData);
  }

  deleteUnionById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleUnionById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }


}
