import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../app.config";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PaginationService {
  current_page: number = 1;

  constructor(private httpClient: HttpClient) { }

  get_pages(request_url: string, current_page: number): Observable<object> {
    this.current_page = current_page;

    return this.httpClient.get(appConfig.apiUrl + request_url).map(
      resp => {
        let start_index: number;
        let end_index: number;
        let total_pages: number;
        let pages: number[] = [];
        let total_items = resp['count'];

        // get number of total pages from total items
        if (total_items === 0) {
          total_pages = 1;
        } else {
          total_pages = Math.ceil( total_items / appConfig.items_per_page);
        }

        // we need half of page_links_num in a number of places
        const page_links_num_half = Math.floor(appConfig.page_links_num / 2);
        // set current page in the middle of pagination if it is possible
        // first find what should be the first index in pages[]
        if (current_page <= page_links_num_half) { // can only be the first side of the half
          start_index = 1;
        } else if ((total_pages - current_page) > page_links_num_half) { // can be in the middle
          start_index = current_page - page_links_num_half;
        } else { // can only on the second side of the half
          start_index = total_pages - appConfig.page_links_num;
        }

        // find the end index in pages[]
        if (total_pages > appConfig.page_links_num) {
          end_index = start_index + appConfig.page_links_num;
        } else {
          end_index = total_pages;
        }

        for (let i = start_index; i <= end_index; i++) {
          pages.push(i);
        }

        return {'pages': pages, 'total_pages': total_pages};
      }
    );
  }

  /**
   * get filter object for pagination purpose
   * that can be used on loopback REST as filter
   * when changed to json
   * @returns {Object}
   */
  get_page_filter(): object {
    // find skip index for the current page
    const skip_index = (this.current_page - 1) * appConfig.items_per_page;

    // create loopback REST filter object for pagination
    return {
      skip: skip_index,
      limit: appConfig.items_per_page,
    };
  }

}
