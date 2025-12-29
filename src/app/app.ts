import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 
import { DataService } from './services/data'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  constructor(public dataService: DataService, private router: Router) {}

  
  logout() {
    this.dataService.logout();
    this.router.navigate(['/login']);
  }

  
  isLoggedIn() {
    return this.dataService.getCurrentUser() !== null;
  }
}