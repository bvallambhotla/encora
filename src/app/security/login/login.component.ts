import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { USERS_GET } from '../../common/common.constants';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Validates the credentials against the set of users
   */
  async signin() {
    const users: any = await this.http.get(USERS_GET).toPromise();
    if (users && users.some((x) => x.email == 'emailfromform')) {
      // route to companies
      this.router.navigate(['/companies']);
    } else {
      // show error message
    }
  }
}
