import { Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Filter } from 'src/app/@models/filter';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filters: Filter;
  @Output() filtersEmitter: EventEmitter<Filter> = new EventEmitter<Filter>();
  constructor() {  }

  ngOnInit() {
    this.filters = {location: '', favorite: false};
  }  

  favoriteEvent(event) {
    this.filters.favorite = event.target.checked;
    this.filtersEmitter.emit(this.filters);
  }

  locationEvent(event) {
    this.filters.location = event.target.value;    
    this.filtersEmitter.emit(this.filters);
  }
}
