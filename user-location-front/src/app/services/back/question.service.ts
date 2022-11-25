import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/@models/answer';
import { Filter } from 'src/app/@models/filter';
import { Question } from 'src/app/@models/question';

const QUESTIONS_URL = 'questions/';
const FAVORITE_QUESTIONS_URL = 'liked_questions/';
const ANSWERS_URL = 'answers/'

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

  setFavQuestion(questionId: string) {
    return this.http.post(
      FAVORITE_QUESTIONS_URL + questionId,
      {}
    )
  }

  getSingleQuestionAnswers(questionId: string, offset?): any {
    return this.http.get(
      ANSWERS_URL + questionId,
      { params: 
        {
          offset: offset
        }
      }
    )
  }

  createQuestion(question) {
    return this.http.post(
      QUESTIONS_URL + 'new',
      question
    )
  }

  createAnswer(answer): any {
    return this.http.post(
      ANSWERS_URL + 'new',
      answer
    )
  }
}
