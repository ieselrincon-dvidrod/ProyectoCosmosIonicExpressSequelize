import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GimnasioService } from '../services/gimnasio-service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
  standalone: false
})
export class DeletePage implements OnInit {

  deleteForm!: FormGroup; // <- le decimos a TS que se inicializará
  mensaje: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private gimnasioService: GimnasioService,
    private router: Router // <- inyectamos Router
  ) { }

  ngOnInit() {
  this.deleteForm = this.formBuilder.group({
  id: [null, [Validators.required, Validators.min(1)]]
});
  }

  borrarUsuario() {
    if (this.deleteForm.valid) {
      const id = this.deleteForm.value.id;
      this.gimnasioService.deleteGimnasio(id).subscribe({
        next: () => {
          this.mensaje = `Usuario con id ${id} eliminado correctamente`;
        },
        error: (err) => {
          this.mensaje = `Error al eliminar usuario: ${err.error.message || err.message}`;
        }
      });
    } else {
      this.mensaje = 'Debes ingresar un ID válido';
    }
  }

  volver() { 
    this.router.navigateByUrl("/home"); 
  }

}
