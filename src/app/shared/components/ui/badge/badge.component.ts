import { Component } from '@angular/core';

@Component({
  selector: 'app-ui-badge',
  standalone: true,
  template: `
    <span class="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-mono font-bold border border-zinc-900 bg-zinc-100 text-zinc-900 shadow-[1px_1px_0px_0px_rgba(9,9,11,1)]">
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {}