import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaginationService} from '../../../services/pagination.service';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  host: {
    'class': 'center',
    '[class.hide]': 'total_pages == 1',
  }
})
export class PaginationComponent implements OnInit, OnChanges {

  current_page = 1;
  pages = [1];
  total_pages = 1;

  @Input() request_url;

  @Output() reload = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private paginationService: PaginationService,
              private notifService: NotificationService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params['page']) {
          this.current_page = +params['page'];
        } else {
          this.current_page = 1;
        }

        this.setPages();
      },
      err => {
        console.log('route params subscription error:', err);
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if request_url was not already set i.e it is first time
    // so ngOnInit will handle setting the pages for now
    if (changes.request_url && changes.request_url.previousValue !== undefined) {
      this.setPages();  // reload item list component
    }
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
          this.notifService.error('Loading pages failed', null, err);
        }
      );
  }

}
