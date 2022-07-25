import {Component} from '@angular/core';
import {AuthService} from "./_services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dataRX';

  constructor(private auth: AuthService) {
  }

  login() {
    this.auth.login().subscribe(res => {
      console.log(res);
    })
  }
}
