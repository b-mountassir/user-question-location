import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/@models/user';
import { AuthService } from 'src/app/services/back/auth.service';
import { SessionStorageService } from 'src/app/services/front/session-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean;

  constructor(private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  get f() { return this.registerForm.controls; }

  onSubmit() {
    let user: User = {email: this.f.email.value, password: this.f.password.value};
    
    this.authService.register(user).subscribe(
      (res: any) => {
        this.loading = true;
      },
      (error) => {
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.router.navigate(['/auth', 'login']);
      }
    )
  }

}
