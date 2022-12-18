import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Blog} from '../../interfaces/common/blog.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_BRAND = environment.apiBaseLink + '/api/blog/';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addBlog
   * insertManyBlog
   * getAllBlogs
   * getBlogById
   * updateBlogById
   * updateMultipleBlogById
   * deleteBlogById
   * deleteMultipleBlogById
   */

  addBlog(data: Blog) {
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'add', data);
  }

  insertManyBlog(data: Blog, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_BRAND + 'insert-many', mData);
  }

  getAllBlogs(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Blog[], count: number, success: boolean }>(API_BRAND + 'get-all', filterData, {params});
  }

  getBlogById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Blog, message: string, success: boolean }>(API_BRAND + id, {params});
  }

  updateBlogById(id: string, data: Blog) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_BRAND + 'update/' + id, data);
  }

  updateMultipleBlogById(ids: string[], data: Blog) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_BRAND + 'update-multiple', mData);
  }

  deleteBlogById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_BRAND + 'delete/' + id, {params});
  }

  deleteMultipleBlogById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_BRAND + 'delete-multiple', {ids: ids}, {params});
  }


}
