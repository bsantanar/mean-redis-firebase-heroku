import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  PASSWORD_MIN_LENGTH = 5;
  loginForm: FormGroup;
  loading: boolean = false;
  
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.user.subscribe(
      res => {
        if(res){
          this.router.navigate(['/products']);
        }
      }
    )
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(this.PASSWORD_MIN_LENGTH)]]
    });
  }

  // getter form
  get f() { return this.loginForm.controls; }

  login(){
    this.loading = true;
    this.authService.loginWithEmail(this.f.username.value, this.f.password.value)
      .then(res => {
        //console.log(res);
        this.router.navigate(['/products']);
      })
      .catch(err => {
        //console.log(err);
        this.loading = false;
      });
  }

  register(){
    this.loading = true;
    this.authService.registerEmail(this.f.username.value, this.f.password.value)
      .then(res => {
        //console.log(res);
        this.router.navigate(['/products']);
      })
      .catch(err => {
        //console.log(err);
        this.loading = false;
      })
  }

}
