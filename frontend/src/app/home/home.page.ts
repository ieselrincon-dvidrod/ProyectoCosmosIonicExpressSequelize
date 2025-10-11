import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GimnasioService } from '../services/gimnasio-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  gimnasios: any[] = [];

  constructor(private router: Router, private gimnasioService: GimnasioService) {}

  ngOnInit() {
    this.getAllGimnasios();
  }

  ionViewWillEnter() {
    this.getAllGimnasios();
  }

  getAllGimnasios() {
    this.gimnasioService.getGimnasios().subscribe({
      next: (response: any) => {
        console.log('Respuesta del backend:', response);
        this.gimnasios = response;
      },
      error: (err) => {
        console.error('Error al obtener gimnasios:', err);
      }
    });
  }

  BorradoUsuarios() { this.router.navigateByUrl("/delete"); }
  ActualizarUsuarios() { this.router.navigateByUrl("/update"); }
  AddUsuario() { this.router.navigateByUrl("/insert"); }

}