import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {SubDistrict} from '../../interfaces/common/sub-district.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {SubCategory} from '../../interfaces/common/sub-category.interface';

const API_BRAND = environment.apiBaseLink + '/api/sub-district/';


@Injectable({
  providedIn: 'root'
})
export class SubDistrictService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addSubDistrict
   * insertManySubDistrict
   * getAllSubDistricts
   * getSubDistrictById
   * updateSubDistrictById
   * updateMultipleSubDistrictById
   * deleteSubDistrictById
   * deleteMultipleSubDistrictById
   */

  addSubDistrict(data: SubDistrict) {
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'add', data);
  }

  insertManySubDistrict(data: SubDistrict, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'insert-many', mData);
  }

  getAllSubDistricts(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: SubDistrict[], count: number, success: boolean }>(API_BRAND + 'get-all', filterData, {params});
  }

  getSubDistrictById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SubDistrict, message: string, success: boolean }>(API_BRAND + id, {params});
  }

  updateSubDistrictById(id: string, data: SubDistrict) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  updateMultipleSubDistrictById(ids: string[], data: SubDistrict) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BRAND + 'update-multiple', mData);
  }

  deleteSubDistrictById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleSubDistrictById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }

  getSubDistrictByDistrictId(countryId: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SubCategory[], message: string, success: boolean }>(API_BRAND + 'get-all-by-parent/' + countryId, {params});
  }


}
