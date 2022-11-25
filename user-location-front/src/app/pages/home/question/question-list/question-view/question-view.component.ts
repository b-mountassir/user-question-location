import { AfterContentChecked, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Answer } from 'src/app/@models/answer';
import { Question } from 'src/app/@models/question';
import { QuestionService } from 'src/app/services/back/question.service';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.css']
})
export class QuestionViewComponent implements OnInit {

  @Input() question: Question;
  @Input() answers: Answer[];
  @Input() offset: number;

  answer: Answer;
  formData: FormGroup;
  constructor(private questionService: QuestionService, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.formData = this.formBuilder.group({
      content: ['', Validators.nullValidator]
    })
    
  }

  onSubmit() {
    const answerObject= {
      content: this.formData.get('content').value,
      question_id: this.question.id
    };
    console.log(answerObject);
    
    this.setNewAnswer(answerObject);
  }

  async setNewAnswer(answer){
    this.questionService.createAnswer(answer).subscribe(
      (data) => {
        console.log(data);
        this.answers = [];
        this.offset = 0;
        this.onLoadMore();
      }
    );
  }

  onLoadMore() {
    this.questionService.getSingleQuestionAnswers(this.question.id, this.offset)
    .pipe(
      distinctUntilChanged(),
      debounceTime(200)
    )
    .subscribe(
      (data) => {
        this.answers = this.answers.concat(data);
        this.offset += data.length;
      }
    );
  }
}
