import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class DataLoginService {

  nombreUsuario: string = 'Sin Nombre.....!!!';
  private apiUrl = 'http://localhost:4000/api/login'; // URL de autenticación
  private createUserUrl = 'http://localhost:4000/api/create-user'; // URL para crear usuarios

  constructor(private http: HttpClient) { }

  validarCredenciales(username: string, password: string): Observable<boolean> {
    const credentials = { username, password };

    return this.http.post<boolean>(this.apiUrl, credentials);
  }

  agregarUsuario(nuevoUsuario: Usuario): Observable<any> {
    return this.http.post<any>(this.createUserUrl, nuevoUsuario);
  }
}
