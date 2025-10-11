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

  deleteForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private gimnasioService: GimnasioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.deleteForm = this.formBuilder.group({
      id: [null, [Validators.required, Validators.min(1)]]
    });
  }

  borrarUsuario() {
    if (!this.deleteForm.valid) return;

    const id = this.deleteForm.value.id;
    this.gimnasioService.deleteGimnasio(id).subscribe({
      next: () => {
        this.volver();
      },
      error: (err) => {
        console.error("Error al eliminar usuario:", err);
      }
    });
  }

  volver() { 
    this.router.navigateByUrl("/home"); 
  }

}
