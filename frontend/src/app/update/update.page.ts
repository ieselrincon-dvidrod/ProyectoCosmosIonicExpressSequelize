import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: false
})
export class UpdatePage implements OnInit {

  gimnasioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.gimnasioForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      bono: ['', Validators.required]
    });
  }

  ngOnInit() {}

  cargarUsuario() {
    const id = this.gimnasioForm.get('id')?.value;
    if (!id) {
      this.presentToast("Debes ingresar un ID válido", "danger");
      return;
    }

    this.http.get<any>(`http://localhost:8080/api/gimnasios/${id}`)
      .subscribe({
        next: (data) => {
          this.gimnasioForm.patchValue({
            nombre: data.nombre,
            apellidos: data.apellidos,
            correo: data.correo,
            bono: data.bono
          });

          Object.keys(this.gimnasioForm.controls).forEach(field => {
            const control = this.gimnasioForm.get(field);
            control?.markAsDirty();
            control?.markAsTouched();
            control?.updateValueAndValidity();
          });
        },
        error: (err) => {
          console.error("Error al cargar usuario:", err);
          this.presentToast("Error al cargar el usuario", "danger");
        }
      });
  }

  updateUsuario() {
    const id = this.gimnasioForm.get('id')?.value;
    if (!id) {
      this.presentToast("ID inválido", "danger");
      return;
    }

    const { nombre, apellidos, correo, bono } = this.gimnasioForm.value;

    this.http.put<any>(`http://localhost:8080/api/gimnasios/${id}`, { nombre, apellidos, correo, bono })
      .subscribe({
        next: () => {
          this.presentToast("Usuario actualizado correctamente", "success");
          this.volver();
        },
        error: (err) => {
          console.error("Error al actualizar usuario:", err);
          this.presentToast("Error al actualizar usuario", "danger");
        }
      });
  }

  volver() {
    this.router.navigateByUrl("/home");
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }
}
