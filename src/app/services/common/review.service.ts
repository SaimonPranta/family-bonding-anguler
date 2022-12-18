import {Injectable} from '@angular/core';
import {Pagination} from '../../interfaces/core/pagination';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Review} from '../../interfaces/common/review.interface';
import {FilterData} from '../../interfaces/core/filter-data';
import {Product} from '../../interfaces/common/product.interface';
import {Order} from '../../interfaces/common/order.interface';

const API_REVIEW_CONTROL = environment.apiBaseLink + '/api/review/';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Review Control
   */

  addReview(data: Review) {
    return this.httpClient.post<{ message: string }>(API_REVIEW_CONTROL + 'add', data);
  }


  getAllReviews() {
    return this.httpClient.get<{data: Review[], message?: string}>(API_REVIEW_CONTROL + 'get-all-review');
  }

  // getReviewByReviewId(id: string) {
  //   return this.httpClient.get<{data: Review, message?: string}>(API_REVIEW_CONTROL + 'get-review-by-review-id/' + id);
  // }


  getReviewByReviewId(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Review, message: string, success: boolean }>(API_REVIEW_CONTROL + id, {params});
  }

  editReview(data: Review) {
    return this.httpClient.put<{ message: string }>(API_REVIEW_CONTROL + 'update', data);
  }

  deleteReviewByReviewId(id: string) {
    return this.httpClient.delete<{message?: string}>(API_REVIEW_CONTROL + 'delete/' + id);
  }

  getAllReviewsByQuery(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Review[], count: number, success: boolean }>(API_REVIEW_CONTROL + 'get-all-review-by-query', filterData, {params});
  }


}
