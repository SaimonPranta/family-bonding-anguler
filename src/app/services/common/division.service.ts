import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Division} from '../../interfaces/common/division.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {SubCategory} from '../../interfaces/common/sub-category.interface';

const API_DIVISION = environment.apiBaseLink + '/api/division/';


@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addDivision
   * insertManyDivision
   * getAllDivisions
   * getDivisionById
   * updateDivisionById
   * updateMultipleDivisionById
   * deleteDivisionById
   * deleteMultipleDivisionById
   */

  addDivision(data: Division) {
    return this.httpClient.post<ResponsePayload>
    (API_DIVISION + 'add', data);
  }

  insertManyDivision(data: Division, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_DIVISION + 'insert-many', mData);
  }

  getAllDivisions(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Division[], count: number, success: boolean }>(API_DIVISION + 'get-all', filterData, {params});
  }

  getDivisionById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Division, message: string, success: boolean }>(API_DIVISION + id, {params});
  }

  updateDivisionById(id: string, data: Division) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_DIVISION + 'update/' + id, data);
  }

  updateMultipleDivisionById(ids: string[], data: Division) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_DIVISION + 'update-multiple', mData);
  }

  deleteDivisionById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_DIVISION + 'delete/' + id, {params});
  }

  deleteMultipleDivisionById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_DIVISION + 'delete-multiple', {ids: ids}, {params});
  }


  getDivisionByCountryId(countryId: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: SubCategory[], message: string, success: boolean }>(API_DIVISION + 'get-all-by-parent/' + countryId, {params});
  }
}
