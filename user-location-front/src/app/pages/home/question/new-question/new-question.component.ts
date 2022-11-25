import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Question } from 'src/app/@models/question';
import { QuestionService } from 'src/app/services/back/question.service';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {
  formData: FormGroup;
  latitude: number;
  longitude: number;
  zoom:number;

  newQuestion: Question;

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService) { }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(
      data => {
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
        this.zoom = 15;
      }
    )
    this.formData = this.formBuilder.group({
      title: [''], 
      content: ['']
    })
  }

  onSubmit() {
    this.newQuestion = this.formData.value;
    this.newQuestion.location = `latitude: ${this.latitude}, longitude: ${this.longitude}`;
    this.questionService.createQuestion(this.newQuestion).subscribe()
  }

}
