import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/@models/question';
import { QuestionService } from 'src/app/services/back/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  @Input() questionList: Question[];
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  

}
