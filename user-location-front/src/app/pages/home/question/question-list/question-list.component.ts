import { Component, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { Question } from 'src/app/@models/question';
import { QuestionService } from 'src/app/services/back/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  @Output() @Input() questionList: Question[];
  
  pageNumber = 1;
  
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
  }

  addFavQuestion(questionId) {
    this.questionService.setFavQuestion(questionId.$oid).subscribe(
      (data) => {
        console.log(data);
        
      }
    );
  }

  onTableScroll(e) {
    const tableViewHeight = e.target.offsetHeight 
    const tableScrollHeight = e.target.scrollHeight 
    const scrollLocation = e.target.scrollTop;
    
    
    // If the user has scrolled within 200px of the bottom, add more data
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



}
