import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { DataService } from '../services/data'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private dataService: DataService, private router: Router) {}

  login() {
 
    const users = this.dataService.getUsers();

    
    const user = users.find((u: any) => u.username === this.username && u.password === this.password);

    if (user) {
      this.dataService.setCurrentUser(user); 
      alert('Giriş Başarılı!');
      this.router.navigate(['/feed']); 
    } else {
    
      alert('Kullanıcı adı veya şifre hatalı!');
    }
  }
}