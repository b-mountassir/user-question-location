import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/@models/user';
import { AuthService } from 'src/app/services/back/auth.service';
import { take } from 'rxjs/operators'
import { SessionStorageService } from 'src/app/services/front/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  get f() { return this.loginForm.controls; }

  onSubmit() {
    let user: User = {email: this.f.email.value, password: this.f.password.value};
    console.log(user);
    
    this.authService.login(user).subscribe(
      (res: any) => {
        this.sessionStorageService.setKey('AUTH_TOKEN', res.accessToken);
        this.sessionStorageService.setKey('USER_ID', res.data.id);
        this.loading = true;
      },
      (error) => {
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.router.navigate(['/home']);
      }
    )
  }

}
