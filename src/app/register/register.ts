import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { DataService } from '../services/data'; 
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './register.html',
  styleUrl: './register.css' 
})
export class RegisterComponent {
 
  username = '';
  email = '';
  password = '';

  constructor(private dataService: DataService, private router: Router) {}

  register() {

    if (!this.username || !this.email || !this.password) {
      alert('Lütfen tüm alanları doldurun!');
      return;
    }


    const users = this.dataService.getUsers();
    const userExists = users.find(u => u.username === this.username);

    if (userExists) {
      alert('Bu kullanıcı adı zaten alınmış!');
      return;
    }


    const newUser = {
      id: Date.now(), 
      username: this.username,
      email: this.email,
      password: this.password,
      bio: '',
      profilePhotoUrl: 'https://via.placeholder.com/150' 
    };

    this.dataService.addUser(newUser);
    alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
    this.router.navigate(['/login']);
  }
}