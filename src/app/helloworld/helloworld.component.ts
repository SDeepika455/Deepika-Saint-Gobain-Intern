
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-helloworld',
  standalone: true,
  templateUrl: './helloworld.component.html',
  styleUrls: ['./helloworld.component.css'],
  imports: [CommonModule, RouterModule]
})
export class HelloworldComponent {
  constructor(private router: Router) {}

  navigateToForm() {
    this.router.navigate(['/studentform']).then(success => {
      if (!success) {
        console.error('Navigation failed');
      }
    });  
  }
}