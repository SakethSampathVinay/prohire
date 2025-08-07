import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { read } from 'fs';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  @ViewChild('fileInput') fileInput! : ElementRef<HTMLInputElement>;

  name = ''
  email = ''
  password = ''
  image: File | string = ""


  imagePreview: string | ArrayBuffer | null = null;

  constructor(private signUpService: AuthService) {}


  onChangeLogo(event: Event) {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0) {
      const file = input.files[0];

      const validLogos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if(!validLogos.includes(file.type)) {
        alert("Only Images are Accepted!!!")
        this.image = "";
        return;
      }
      this.image = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string
      };
      reader.readAsDataURL(file);
    }
  }

  openFiles() {
    this.fileInput.nativeElement.click();;
  }

  onSignUp(){

    const formData = new FormData();

    formData.append("name", this.name);
    formData.append('email', this.email);
    formData.append("password", this.password);
    formData.append("image", this.image)

    this.signUpService.onSignUpAdmin(formData).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.access_token)
        localStorage.setItem('name', response.company.name)
        localStorage.setItem('image', response.company.image)    
        localStorage.setItem("companyId", response.company.id)
        console.log(response);
        this.name = '';
        this.email = '';
        this.password = '';
        this.image = '';
      }, 
      error: (err: any) => {
        console.log(err);
        console.error('Validation error details:', err.error?.detail); 
        console.log(JSON.stringify(err.error?.detail, null, 2));
      }
    })
  }
}