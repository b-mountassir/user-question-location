import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-search-bar',
  templateUrl: './question-search-bar.component.html',
  styleUrls: ['./question-search-bar.component.css']
})
export class QuestionSearchBarComponent implements OnInit {

  query: string = ' ';
  constructor() { }

  ngOnInit() {
  }

  search(event): string {
    this.query += event.key;
    console.log(this.query);
    
    return event
  }

}
