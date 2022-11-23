import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/@models/filter';
import { Question } from 'src/app/@models/question';

const QUESTIONS_URL = 'questions'
const FAVORITE_QUESTIONS_URL = 'questions'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(filter?: Filter): Observable<any> {
    return this.http.get(
      QUESTIONS_URL     
    )
  }

  getFavQuestions(filter?: Filter): Observable<any> {
    return this.http.get(
      FAVORITE_QUESTIONS_URL     
    )
  }
}
