import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesterStateService } from '../../services/tester-state.service';

@Component({
  selector: 'app-regex-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-4">
      <!-- Main Expression Bar -->
      <div class="flex items-stretch border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_0px_rgba(9,9,11,1)]">
        <span class="flex items-center px-4 bg-zinc-100 font-mono text-lg text-zinc-500 border-r-2 border-zinc-900 font-bold select-none">/</span>
        <input
          type="text"
          [value]="state.pattern()"
          (input)="onPatternInput($event)"
          placeholder="[A-Za-z0-9]+..."
          class="w-full px-4 py-3 font-mono text-sm md:text-base text-zinc-950 focus:outline-none placeholder:text-zinc-400"
        />
        <span class="flex items-center px-4 bg-zinc-100 font-mono text-lg text-zinc-500 border-l-2 border-zinc-900 font-bold select-none">/</span>
        <input
          type="text"
          [value]="state.flags()"
          (input)="onFlagsInput($event)"
          placeholder="g"
          class="w-16 px-2 text-center font-mono text-sm md:text-base text-zinc-950 font-bold bg-zinc-50 focus:outline-none"
        />
      </div>

      <!-- Live Compiler Alerts -->
      @if (state.regexResult().error; as error) {
        <div class="border-2 border-zinc-900 bg-red-100 text-red-950 p-3 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(9,9,11,1)]">
          <div class="font-bold flex items-center gap-1.5 uppercase mb-1">
            <span class="bg-zinc-900 text-white px-1 text-[10px]">Error</span> Regex compiler error
          </div>
          <p class="break-all font-semibold">{{ error }}</p>
        </div>
      } @else {
        <div class="border-2 border-zinc-900 bg-emerald-50 text-emerald-950 p-3 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(9,9,11,1)]">
          <div class="font-bold flex items-center gap-1.5 uppercase mb-1">
            <span class="bg-zinc-900 text-white px-1 text-[10px] uppercase">Active</span> Regex compiled successfully
          </div>
          <p>Matched pattern compiles safely. Matches detected: {{ state.matches().length }}</p>
        </div>
      }

      <!-- Quick Flag Switches -->
      <div class="flex flex-wrap items-center gap-1.5">
        <span class="font-mono text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mr-2">Flags:</span>
        @for (flagOpt of flagOptions; track flagOpt.char) {
          <button
            (click)="toggleFlag(flagOpt.char)"
            [class]="'cursor-pointer px-2.5 py-1 text-xs font-mono font-bold border border-zinc-900 transition-all select-none ' +
                     (hasFlag(flagOpt.char)
                       ? 'bg-zinc-950 text-white shadow-[1px_1px_0px_0px_rgba(9,9,11,1)]'
                       : 'bg-white text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50')"
            [title]="flagOpt.desc"
          >
            {{ flagOpt.char }}
          </button>
        }
      </div>
    </div>
  `
})
export class RegexInputComponent {
  state = inject(TesterStateService);

  flagOptions = [
    { char: 'g', desc: 'Global search' },
    { char: 'i', desc: 'Case-insensitive' },
    { char: 'm', desc: 'Multiline matching' },
    { char: 's', desc: 'dotAll matches newlines' }
  ];

  onPatternInput(event: Event) {
    this.state.pattern.set((event.target as HTMLInputElement).value);
  }

  onFlagsInput(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.state.flags.set(value.replace(/[^gims]/g, ''));
  }

  hasFlag(char: string): boolean {
    return this.state.flags().includes(char);
  }

  toggleFlag(char: string) {
    const current = this.state.flags();
    if (current.includes(char)) {
      this.state.flags.set(current.replace(char, ''));
    } else {
      this.state.flags.set(current + char);
    }
  }
}