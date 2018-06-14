import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  searchInput: FormControl;

  @Input() options: any[];
  @Output() search = new EventEmitter<object>();

  constructor(private authService: AuthService) {  }

  ngOnInit() {
    // create options in hard way to please materialize
    let optionsForSelect = '';
      // `<option value="" disabled selected>Search by</option>`;
    for (let i = 0; i < this.options.length; i++) {
      // will make the first one selected
      optionsForSelect +=
        `<option value="${this.options[i].optValue}" ${(i === 0) ? 'selected' : ''}>` +
          `${this.options[i].optDisplay}` +
        `</option>`;
    }

    $('#selectFilter').html(optionsForSelect);

    $('select').formSelect();

    // handle the search text input
    this.searchInput = new FormControl();

    this.searchInput.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(
        value => {
          // get attribute by which the search is being made
          const attribute = $('#selectFilter').val() != null ? $('#selectFilter').val() : 'id';
          const term = value.trim();

          if (term) {
            this.search.emit({hasTerm: true, attribute: attribute, term: term});
          } else if (term === '') {
            this.search.emit({hasTerm: false});
          }
        }
      );
  }
}
