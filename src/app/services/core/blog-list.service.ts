import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {BlogList} from '../../interfaces/core/blog-list.interface';

const API_PAGE = environment.apiBaseLink + '/api/additional-page/';


@Injectable({
  providedIn: 'root'
})
export class BlogListService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addBlogList
   * insertManyBlogList
   * getAllBlogLists
   * getBlogListById
   * updateBlogListById
   * updateMultipleBlogListById
   * deleteBlogListById
   * deleteMultipleBlogListById
   */

  addBlogList(data: BlogList) {
    return this.httpClient.post<ResponsePayload>
    (API_PAGE + 'add', data);
  }


  getBlogListBySlug(slug: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: BlogList, message: string, success: boolean }>(API_PAGE + slug, {params});
  }

  updateBlogListBySlug(slug: string, data: BlogList) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_PAGE + 'update-data/' + slug, data);
  }


  deleteBlogListBySlug(slug: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_PAGE + 'delete-data/' + slug, {params});
  }


}
