import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PaginationService } from "../../../services/pagination.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  current_page = 1;
  pages = [1];
  total_pages = 1;

  @Input() request_url;

  @Output() reload = new EventEmitter();

  constructor(private route: ActivatedRoute,
    private paginationService: PaginationService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params['page']) {
          this.current_page = + params['page'];
        } else {
          this.current_page = 1;
        }

        this.setPages();
      },
      err => {
        console.log('route params subscription error', err);
      }
    );
  }

  setPages(): void {
    this.paginationService.get_pages(this.request_url, this.current_page)
      .subscribe(
        resp => {
          this.pages = resp['pages'];
          this.total_pages = resp['total_pages'];

          this.reload.emit();
        },
        err => {
          console.log('pagination service failed', err);
        }
      );
  }

}
