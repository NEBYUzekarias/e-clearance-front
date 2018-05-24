import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {log} from 'util';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  @Input() options: any[];
  @Output() search = new EventEmitter<object>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // create options in hard way to please materialize
    let optionsForSelect =
      `<option value="" disabled selected>Search by</option>`;
    for (let i = 0; i < this.options.length; i++) {
      optionsForSelect +=
        `<option value="${this.options[i].optValue}">${this.options[i].optDisplay}</option>`;
    }

    $('#selectFilter').html(optionsForSelect);

    $('select').formSelect();
  }

  /**
   * fire the search filter and term.
   * @param event
   */
  emitChange(event) {
    const attribute = $('#selectFilter').val() != null ? $('#selectFilter').val() : 'id';
    const term = event.target.value.trim();
    console.log('term', term);

    if (term) {
      this.search.emit({hasTerm: true, attribute: attribute, term: term});
    } else if (term === '') {
      this.search.emit({hasTerm: false});
    }
  }
}
