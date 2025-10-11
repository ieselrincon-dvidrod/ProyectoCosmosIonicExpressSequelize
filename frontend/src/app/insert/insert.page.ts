import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GimnasioService } from '../services/gimnasio-service';




@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
  standalone: false
})
export class InsertPage implements OnInit {

  gimnasioForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private gimnasioService: GimnasioService, private router: Router) {

this.gimnasioForm = this.formBuilder.group({
  nombre: ['',Validators.compose([Validators.required])],
  apellidos: ['',Validators.compose([Validators.required])],
  correo:['',Validators.compose([Validators.required])],
  bono: ['',Validators.compose([Validators.required])]
})

  }


  volver() { this.router.navigateByUrl("/home"); }

    ngOnInit() {}


    createUsuario(){
      if (this.gimnasioForm.valid){
        console.log('Formulario válido', this.gimnasioForm.value);
        this.gimnasioService.create(this.gimnasioForm.value).subscribe(response => {
          this.router.navigateByUrl("home");
        })
      } else {
        console.log('Formulario no válido');
      }
    }

    getFormControl(field: string)
    {
      return this.gimnasioForm.get(field);
    }

}


