import { Component } from '@angular/core';
import { TesterComponent } from './features/tester/tester.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TesterComponent],
  template: `<app-tester></app-tester>`,
  styleUrl: './app.css'
})
export class AppComponent {}