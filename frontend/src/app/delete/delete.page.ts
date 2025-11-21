import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GimnasioService } from '../services/gimnasio-service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
  standalone: false
})
export class DeletePage implements OnInit {

  deleteForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gimnasioService: GimnasioService,
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.deleteForm = this.formBuilder.group({
      id: [null, [Validators.required, Validators.min(1)]]
    });
  }

  async confirmarBorrado() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Seguro que quieres eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => this.borrarUsuario()
        }
      ]
    });

    await alert.present();
  }

  async borrarUsuario() {
    if (!this.deleteForm.valid) return;

    const id = this.deleteForm.value.id;
    this.gimnasioService.deleteGimnasio(id).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Usuario eliminado',
          duration: 4000,
          color: 'success',
          position: 'top',
          cssClass: 'toast-center'
        });
        await toast.present();
        this.volver();
      },
      error: async (err) => {
        const toast = await this.toastController.create({
          message: 'Error al eliminar usuario',
          duration: 4000,
          color: 'danger',
          position: 'top',
          cssClass: 'toast-center'
        });
        await toast.present();
      }
    });
  }

  volver() { 
    this.router.navigateByUrl("/home"); 
  }

}
