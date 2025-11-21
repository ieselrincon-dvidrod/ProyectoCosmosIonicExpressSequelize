import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GimnasioService } from '../services/gimnasio-service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
  standalone: false
})
export class InsertPage implements OnInit {

  gimnasioForm: FormGroup;
  foto: string | null = null;

  constructor(
    public formBuilder: FormBuilder,
    private gimnasioService: GimnasioService,
    private router: Router
  ) {
    this.gimnasioForm = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      apellidos: ['', Validators.compose([Validators.required])],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      bono: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {}

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.foto = image.dataUrl ?? null;
  }

  volver() {
    this.router.navigateByUrl("/home");
  }

  createUsuario() {
    if (this.gimnasioForm.valid) {
      const usuario = { ...this.gimnasioForm.value, foto: this.foto };
      this.gimnasioService.create(usuario).subscribe(() => {
        this.router.navigateByUrl("/home");
      });
    }
  }

  getFormControl(field: string) {
    return this.gimnasioForm.get(field);
  }

}
