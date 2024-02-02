import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario: string = '';
  senha: string = '';
  erroLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  realizarLogin() {
    if (this.authService.autenticar(this.usuario, this.senha)) {
      this.router.navigate(['/formulario']);
    } else {
      this.erroLogin = true;
      setTimeout(() => {
        this.erroLogin = false;
      }, 5000);
    }
  }
}
