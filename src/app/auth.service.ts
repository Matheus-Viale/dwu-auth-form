import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private usuarioValido = 'DWU';
  private senhaValida = 'DWU2023';

  autenticar(usuario: string, senha: string): boolean {
    return usuario === this.usuarioValido && senha === this.senhaValida;
  }
}
