import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      (click)="click.emit($event)"
      [class]="'cursor-pointer px-4 py-2 border-2 border-zinc-900 font-mono text-xs font-bold transition-all uppercase tracking-wider select-none active:translate-y-[1px] active:translate-x-[1px] ' +
               (variant() === 'primary' 
                 ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-[2px_2px_0px_0px_rgba(9,9,11,0.2)] active:shadow-[0px_0px_0px_0px_rgba(9,9,11,1)]' 
                 : 'bg-white text-zinc-900 hover:bg-zinc-100 shadow-[2px_2px_0px_0px_rgba(9,9,11,1)] active:shadow-[0px_0px_0px_0px_rgba(9,9,11,1)]')"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  type = input<string>('button');
  variant = input<'primary' | 'secondary'>('secondary');
  click = output<MouseEvent>();
}