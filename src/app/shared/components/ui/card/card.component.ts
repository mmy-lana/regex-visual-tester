import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  standalone: true,
  template: `
    <div class="border-2 border-zinc-900 bg-white shadow-[4px_4px_0px_0px_rgba(9,9,11,1)] overflow-hidden">
      @if (title()) {
        <div class="border-b-2 border-zinc-900 bg-zinc-50 px-4 py-3 flex items-center justify-between">
          <h3 class="font-mono text-xs font-extrabold text-zinc-900 uppercase tracking-widest">{{ title() }}</h3>
          <ng-content select="[card-header-actions]"></ng-content>
        </div>
      }
      <div class="p-5">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {
  title = input<string>('');
}