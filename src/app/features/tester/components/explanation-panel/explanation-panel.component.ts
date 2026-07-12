import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesterStateService } from '../../services/tester-state.service';
import { BadgeComponent } from '../../../../shared/components/ui/badge/badge.component';

@Component({
  selector: 'app-explanation-panel',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  template: `
    <div class="space-y-6">
      <!-- Capture Group Statistics -->
      <div class="space-y-3">
        <h4 class="font-mono text-xs font-extrabold text-zinc-900 uppercase tracking-widest border-b border-zinc-300 pb-1">
          Parsed Matches ({{ state.matches().length }})
        </h4>

        @if (state.matches().length === 0) {
          <div class="border border-zinc-200 p-4 text-center bg-zinc-50">
            <p class="font-mono text-xs text-zinc-400">No matching indexes discovered.</p>
          </div>
        } @else {
          <div class="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            @for (match of state.matches(); track match.id) {
              <div class="border border-zinc-900 bg-white p-3 shadow-[2px_2px_0px_0px_rgba(9,9,11,1)]">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="font-mono text-xs font-bold text-zinc-900">Match #{{ match.id }}</span>
                  <app-ui-badge>Index: {{ match.index }}</app-ui-badge>
                </div>
                <div class="font-mono text-xs bg-zinc-50 p-2 border border-zinc-200 rounded text-zinc-950 font-bold overflow-x-auto">
                  {{ match.text }}
                </div>

                @if (match.groups.length > 0) {
                  <div class="mt-2 pl-3 border-l-2 border-zinc-900 space-y-1">
                    @for (group of match.groups; track group.index) {
                      <div class="flex items-center gap-1.5 font-mono text-[10px] text-zinc-600">
                        <span class="font-extrabold">Group #{{ group.index }}:</span>
                        @if (group.value) {
                          <span class="bg-zinc-100 border border-zinc-300 px-1 font-bold text-zinc-900">{{ group.value }}</span>
                        } @else {
                          <span class="text-zinc-400 italic">null</span>
                        }
                      </div>
                    }
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>

      <!-- Quick Syntax Cheat-Sheet -->
      <div class="space-y-3">
        <h4 class="font-mono text-xs font-extrabold text-zinc-900 uppercase tracking-widest border-b border-zinc-300 pb-1">
          Common Tokens Cheat-Sheet
        </h4>
        <div class="grid grid-cols-1 gap-1">
          @for (ref of cheatsheet; track ref.token) {
            <div class="flex items-center justify-between text-[11px] font-mono p-2 border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 transition-colors">
              <span class="font-extrabold text-zinc-900 bg-zinc-200 border border-zinc-300 px-1.5 py-0.5 rounded">{{ ref.token }}</span>
              <span class="text-zinc-500 font-semibold">{{ ref.desc }}</span>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class ExplanationPanelComponent {
  state = inject(TesterStateService);

  cheatsheet = [
    { token: '\\w', desc: 'Any word character' },
    { token: '\\d', desc: 'Any digit char [0-9]' },
    { token: '[^a]', desc: 'Any char EXCEPT "a"' },
    { token: 'a{3}', desc: 'Exactly 3 of "a"' },
    { token: '(?:a)', desc: 'Non-capturing group' }
  ];
}