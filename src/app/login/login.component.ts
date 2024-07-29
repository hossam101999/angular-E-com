import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor() { }


  handleSubmitForm(form: NgForm) {
    if (form.valid) {
      console.log(form.value);


      form.reset();
    }
  }
}
