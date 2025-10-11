import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
    standalone: false
})
export class UpdatePage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

    volver() { this.router.navigateByUrl("/home"); }
}

