import { Component, OnInit } from '@angular/core';
import { Filter } from 'src/app/@models/filter';
import { Question } from 'src/app/@models/question';
import { QuestionService } from 'src/app/services/back/question.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions: Question[] = [];
  defaultQuestions: Question[] = [];
  likedQuestions: Question[] = []
  filters: Filter = {location: '',favorite: false};
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getQuestions()
  }

  getFilters(event) {
    this.filters = event;
    if (this.filters.favorite){
      this.getFavQuestions()
    }else {
      this.getQuestions()
    }
  }
  
  getFavQuestions() {
    return this.questionService.getFavQuestions(this.filters).subscribe(
      (data) => {
        this.questions = data
      }
    )
  }

  getQuestions() {
    this.questionService.getQuestions(null, '0').subscribe(
      (data) => {
        this.questions = data;
      }
    );
  }

}
