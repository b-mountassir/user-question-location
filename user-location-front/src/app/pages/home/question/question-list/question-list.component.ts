import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Answer } from 'src/app/@models/answer';
import { Question } from 'src/app/@models/question';
import { QuestionService } from 'src/app/services/back/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  @Input() questionList: Question[];

  currentQuestion: Question;
  answers: Answer[] = [];
  offset: number;
  @Output() questionEmitter: EventEmitter<Question> = new EventEmitter<Question>();
    
  pageNumber = 1;
  
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  addFavQuestion(questionId: string) {
    this.questionService.setFavQuestion(questionId).subscribe(
      (data) => {
        console.log(data);
        
      }
    );
  }

  onTableScroll(e) {
    const tableViewHeight = e.target.offsetHeight 
    const tableScrollHeight = e.target.scrollHeight 
    const scrollLocation = e.target.scrollTop;
    
    const buffer = .1;
    const limit = tableScrollHeight/tableViewHeight - 1 - buffer; 
    if (scrollLocation/tableViewHeight > limit) {
      this.pageNumber += 1; 
      const offset = this.pageNumber * 10 
      this.questionService.getQuestions(null, offset.toString()).pipe(
        take(1)
      ).subscribe(
        (data) => {
          this.questionList = this.questionList.concat(data);
        }
      )
    }
  }

  onQuestionView(question: Question){
    this.currentQuestion = question;
    this.offset = 0;
    console.log(this.offset);
    
    this.questionService.getSingleQuestionAnswers(this.currentQuestion.id, this.offset).subscribe(
      (data: Answer[]) => {
        this.answers = data;
      },
      (error) => {
        console.log(error);      
      }, 
      () => {
        this.questionEmitter.emit(this.currentQuestion)
      }
    );
  }
}
