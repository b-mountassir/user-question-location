import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/@models/filter';
import { Question } from 'src/app/@models/question';

const QUESTIONS_URL = 'questions'
const FAVORITE_QUESTIONS_URL = 'liked_questions/'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(filter?: Filter | undefined, offset?: string | undefined): Observable<any> {
    return this.http.get(
      QUESTIONS_URL,
      { params: 
        {
          offset: offset,
          location: filter ? filter.location : '',
          favorite: filter ? filter.favorite.toString() : ''
        }
      }    
    )
  }

  getFavQuestions(filter?: Filter): Observable<any> {
    return this.http.get(
      FAVORITE_QUESTIONS_URL     
    )
  }

  setFavQuestion(questionId) {
    return this.http.post(
      FAVORITE_QUESTIONS_URL + questionId,
      {}
    )
  }
}
