import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Newsletter} from '../../interfaces/common/newsletter.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_NEWSLETTER = environment.apiBaseLink + '/api/newsletter/';


@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addNewsletter
   * insertManyNewsletter
   * getAllNewsletters
   * getNewsletterById
   * updateNewsletterById
   * updateMultipleNewsletterById
   * deleteNewsletterById
   * deleteMultipleNewsletterById
   */

  addNewsletter(data: Newsletter) {
    return this.httpClient.post<ResponsePayload>
    (API_NEWSLETTER + 'add', data);
  }

  insertManyNewsletter(data: Newsletter, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_NEWSLETTER + 'insert-many', mData);
  }

  getAllNewsletters(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Newsletter[], count: number, success: boolean }>(API_NEWSLETTER + 'get-all', filterData, {params});
  }

  getNewsletterById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Newsletter, message: string, success: boolean }>(API_NEWSLETTER + id, {params});
  }

  updateNewsletterById(id: string, data: Newsletter) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_NEWSLETTER + 'update/' + id, data);
  }

  updateMultipleNewsletterById(ids: string[], data: Newsletter) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_NEWSLETTER + 'update-multiple', mData);
  }

  deleteNewsletterById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_NEWSLETTER + 'delete/' + id, {params});
  }

  deleteMultipleNewsletterById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_NEWSLETTER + 'delete-multiple', {ids: ids}, {params});
  }


}
