import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {District} from '../../interfaces/common/district.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {SubCategory} from '../../interfaces/common/sub-category.interface';

const API_BRAND = environment.apiBaseLink + '/api/district/';


@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addDistrict
   * insertManyDistrict
   * getAllDistricts
   * getDistrictById
   * updateDistrictById
   * updateMultipleDistrictById
   * deleteDistrictById
   * deleteMultipleDistrictById
   */

  addDistrict(data: District) {
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'add', data);
  }

  insertManyDistrict(data: District, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'insert-many', mData);
  }

  getAllDistricts(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: District[], count: number, success: boolean }>(API_BRAND + 'get-all', filterData, {params});
  }

  getDistrictById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: District, message: string, success: boolean }>(API_BRAND + id, {params});
  }

  updateDistrictById(id: string, data: District) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  updateMultipleDistrictById(ids: string[], data: District) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BRAND + 'update-multiple', mData);
  }

  deleteDistrictById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleDistrictById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }


  getDistrictByDivisionId(divisionId: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SubCategory[], message: string, success: boolean }>(API_BRAND + 'get-all-by-parent/' + divisionId, {params});
  }
}
