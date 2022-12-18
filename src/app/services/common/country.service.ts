import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Country} from '../../interfaces/common/country.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {SubCategory} from '../../interfaces/common/sub-category.interface';

const API_BRAND = environment.apiBaseLink + '/api/country/';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addCountry
   * insertManyCountry
   * getAllCountrys
   * getCountryById
   * updateCountryById
   * updateMultipleCountryById
   * deleteCountryById
   * deleteMultipleCountryById
   */

  addCountry(data: Country) {
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'add', data);
  }

  insertManyCountry(data: Country, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'insert-many', mData);
  }

  getAllCountrys(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Country[], count: number, success: boolean }>(API_BRAND + 'get-all', filterData, {params});
  }

  getCountryById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Country, message: string, success: boolean }>(API_BRAND + id, {params});
  }

  updateCountryById(id: string, data: Country) {
    console.log('id', id)
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  updateMultipleCountryById(ids: string[], data: Country) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BRAND + 'update-multiple', mData);
  }

  deleteCountryById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleCountryById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }

  getCountryIdByContinentId(continentId: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data:Country[] , message: string, success: boolean }>(API_BRAND + 'get-all-by-parent/' + continentId, {params});
  }

}
