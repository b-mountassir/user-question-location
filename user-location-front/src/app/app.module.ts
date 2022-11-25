import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { InterceptorProviders  } from './@core/http-interceptor.service';
import { ProfileComponent } from './pages/home/profile/profile.component';
import { FiltersComponent } from './pages/home/filters/filters.component';
import { QuestionComponent } from './pages/home/question/question.component';
import { QuestionListComponent } from './pages/home/question/question-list/question-list.component';
import { QuestionSearchBarComponent } from './pages/home/question/question-search-bar/question-search-bar.component';
import { QuestionViewComponent } from './pages/home/question/question-list/question-view/question-view.component';
import { NewQuestionComponent } from './pages/home/question/new-question/new-question.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    FiltersComponent,
    QuestionComponent,
    QuestionListComponent,
    QuestionSearchBarComponent,
    QuestionViewComponent,
    NewQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [InterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
