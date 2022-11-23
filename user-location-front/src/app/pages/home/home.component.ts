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
  filter: Filter = {location: '',favorite: false};
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(
      (data) => {
        this.questions = data;
      }
    );
  }

}
