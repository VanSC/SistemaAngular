import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataLoginService } from 'src/app/services/data-login.service';
import { Usuario } from 'src/app/models/users';
import Swal from 'sweetalert2'; // Para mostrar mensajes al usuario

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private dataLogin: DataLoginService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  createUser() {
    if (this.userForm.valid) {
      const newUser = new Usuario(
        this.userForm.get('username')?.value,
        this.userForm.get('password')?.value
      );

      this.dataLogin.agregarUsuario(newUser).subscribe(
        (response) => {
          // Éxito al crear el usuario
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Usuario creado con éxito'
          });

          this.userForm.reset();

          // Opcionalmente, puedes navegar a la página de inicio de sesión después de crear el usuario
          // this.router.navigate(['/login']);
        },
        (error) => {
          // Error al crear el usuario
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el usuario'
          });
        }
      );
    }
  }
}
