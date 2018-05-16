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
  @Output() filterSelectedAndInputDone = new EventEmitter<Object>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
    let optionsForSelect = ` <option value="" disabled selected>Search by</option>`;

    for (let i = 0; i < this.options.length; i++) {
      optionsForSelect += `<option value="${this.options[i].optValue}">${this.options[i].optDisplay}</option>`;
    }

    $('#selectFilter').html(optionsForSelect);

    $('select').formSelect();
  }

  //fire the search filter and term.
  emitChange(event) {
    var filter = $('#selectFilter').val() != null ? $('#selectFilter').val() : 'studentId';
    var term = event.target.value;

    if (term) {
      this.filterSelectedAndInputDone.emit({hasTerm: true, filter, term});
    }
    else if(term == ''){

      this.filterSelectedAndInputDone.emit({hasTerm: false});

    }

  }




}
