import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ResponsePayload} from '../../interfaces/core/response-payload.interface';
import {Carousel} from '../../interfaces/common/carousel.interface';
import {FilterData} from '../../interfaces/core/filter-data';

const API_CAROUSEL = environment.apiBaseLink + '/api/carousel/';


@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * addCarousel
   * insertManyCarousel
   * getAllCarousels
   * getCarouselById
   * updateCarouselById
   * updateMultipleCarouselById
   * deleteCarouselById
   * deleteMultipleCarouselById
   */

  addCarousel(data: Carousel) {
    return this.httpClient.post<ResponsePayload>
    (API_CAROUSEL + 'add', data);
  }

  insertManyCarousel(data: Carousel, option?: any) {
    const mData = {data, option}
    return this.httpClient.post<ResponsePayload>
    (API_CAROUSEL + 'insert-many', mData);
  }

  getAllCarousels(filterData: FilterData, searchQuery?: string) {
    let params = new HttpParams();
    if (searchQuery) {
      params = params.append('q', searchQuery);
    }
    return this.httpClient.post<{ data: Carousel[], count: number, success: boolean }>(API_CAROUSEL + 'get-all', filterData, {params});
  }

  getCarouselById(id: string, select?: string) {
    let params = new HttpParams();
    if (select) {
      params = params.append('select', select);
    }
    return this.httpClient.get<{ data: Carousel, message: string, success: boolean }>(API_CAROUSEL + id, {params});
  }

  updateCarouselById(id: string, data: Carousel) {
    return this.httpClient.put<{ message: string, success: boolean }>(API_CAROUSEL + 'update/' + id, data);
  }

  updateMultipleCarouselById(ids: string[], data: Carousel) {
    const mData = {...{ids: ids}, ...data}
    return this.httpClient.put<ResponsePayload>(API_CAROUSEL + 'update-multiple', mData);
  }

  deleteCarouselById(id: string, checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.delete<ResponsePayload>(API_CAROUSEL + 'delete/' + id, {params});
  }

  deleteMultipleCarouselById(ids: string[], checkUsage?: boolean) {
    let params = new HttpParams();
    if (checkUsage) {
      params = params.append('checkUsage', checkUsage);
    }
    return this.httpClient.post<ResponsePayload>(API_CAROUSEL + 'delete-multiple', {ids: ids}, {params});
  }


}
