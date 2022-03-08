import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services/rest-api.service';
import { FormsModule } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() login = { username: '', password: ''};
  constructor(public restApi: RestApiService, public router: Router, public authService: AuthService) {}
  ngOnInit() {}
  loginButton() {
    this.restApi.login(this.login).subscribe(
      () => {
          console.log("User is logged in");
          this.router.navigateByUrl('/');
      });
  }
  testLogin(){
    window.alert(this.authService.isLoggedIn());
  }
}
