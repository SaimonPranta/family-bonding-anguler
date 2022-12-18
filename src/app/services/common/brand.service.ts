import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Brand} from '../../interfaces/common/brand.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_BRAND = environment.apiBaseLink + '/api/brand/';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addBrand
   * insertManyBrand
   * getAllBrands
   * getBrandById
   * updateBrandById
   * updateMultipleBrandById
   * deleteBrandById
   * deleteMultipleBrandById
   */

  addBrand(data: Brand) {
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'add', data);
  }


  getAllBrands(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Brand[], count: number, success: boolean }>(API_BRAND + 'get-all', filterData, {params});
  }

  getBrandById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Brand, message: string, success: boolean }>(API_BRAND + id, {params});
  }

  updateBrandById(id: string, data: Brand) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  updateMultipleBrandById(ids: string[], data: Brand) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BRAND + 'update-multiple', mData);
  }

  deleteBrandById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleBrandById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }


}
