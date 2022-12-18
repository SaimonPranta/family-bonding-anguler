import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Variation} from '../../interfaces/common/variation.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_VARIATION = environment.apiBaseLink + '/api/variation/';


@Injectable({
  providedIn: 'root'
})
export class VariationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addVariation
   * insertManyVariation
   * getAllVariations
   * getVariationById
   * updateVariationById
   * updateMultipleVariationById
   * deleteVariationById
   * deleteMultipleVariationById
   */

  addVariation(data: Variation) {
    return this.httpClient.post<ResponsePayload>
    (API_VARIATION + 'add', data);
  }

  insertManyVariation(data: Variation, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_VARIATION + 'insert-many', mData);
  }

  getAllVariations(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Variation[], count: number, success: boolean }>(API_VARIATION + 'get-all', filterData, {params});
  }

  getVariationById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Variation, message: string, success: boolean }>(API_VARIATION + id, {params});
  }

  updateVariationById(id: string, data: Variation) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_VARIATION + 'update/' + id, data);
  }

  updateMultipleVariationById(ids: string[], data: Variation) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_VARIATION + 'update-multiple', mData);
  }

  deleteVariationById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_VARIATION + 'delete/' + id, {params});
  }

  deleteMultipleVariationById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_VARIATION + 'delete-multiple', {ids: ids}, {params});
  }


}
