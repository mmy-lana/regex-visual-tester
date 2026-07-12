import { Component, inject } from '@angular/core';
import { TesterStateService } from '../../services/tester-state.service';

@Component({
  selector: 'app-test-string',
  standalone: true,
  template: `
    <div class="space-y-2">
      <label class="block font-mono text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">Test String Context</label>
      <div class="border-2 border-zinc-900 bg-white">
        <textarea
          [value]="state.testString()"
          (input)="onTextInput($event)"
          rows="6"
          placeholder="Insert target validation contents here..."
          class="w-full p-4 font-mono text-xs leading-relaxed text-zinc-950 focus:outline-none resize-y block min-h-[140px]"
        ></textarea>
      </div>
    </div>
  `
})
export class TestStringComponent {
  state = inject(TesterStateService);

  onTextInput(event: Event) {
    this.state.testString.set((event.target as HTMLTextAreaElement).value);
  }
}