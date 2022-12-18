import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Contact} from '../../interfaces/common/contact.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_CONTACT = environment.apiBaseLink + '/api/contact-us/';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addContact
   * insertManyContact
   * getAllContacts
   * getContactById
   * updateContactById
   * updateMultipleContactById
   * deleteContactById
   * deleteMultipleContactById
   */

  addContact(data: Contact) {
    return this.httpClient.post<ResponsePayload>
    (API_CONTACT + 'add', data);
  }

  insertManyContact(data: Contact, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_CONTACT + 'insert-many', mData);
  }

  getAllContacts(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Contact[], count: number, success: boolean }>(API_CONTACT + 'get-all', filterData, {params});
  }

  getContactById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Contact, message: string, success: boolean }>(API_CONTACT + id, {params});
  }

  updateContactById(id: string, data: Contact) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_CONTACT + 'update/' + id, data);
  }

  updateMultipleContactById(ids: string[], data: Contact) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_CONTACT + 'update-multiple', mData);
  }

  deleteContactById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_CONTACT + 'delete/' + id, {params});
  }

  deleteMultipleContactById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_CONTACT + 'delete-multiple', {ids: ids}, {params});
  }


}
