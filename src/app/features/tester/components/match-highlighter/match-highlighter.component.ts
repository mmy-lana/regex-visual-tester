import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesterStateService } from '../../services/tester-state.service';

@Component({
  selector: 'app-match-highlighter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <label class="block font-mono text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest">Visualizer Preview</label>
        <span class="font-mono text-[10px] text-zinc-400 font-bold">Matches marked in yellow</span>
      </div>
      
      <div class="border-2 border-zinc-900 bg-white p-5 font-mono text-xs leading-relaxed text-zinc-900 whitespace-pre-wrap select-text min-h-[140px] relative">
        @if (state.segments().length === 0) {
          <span class="text-zinc-400 italic">No text provided or compiled.</span>
        } @else {
          @for (seg of state.segments(); track $index) {
            @if (seg.isMatch) {
              <span
                (mouseenter)="activeId.set(seg.matchId || null)"
                (mouseleave)="activeId.set(null)"
                [class]="'inline py-0.5 font-bold transition-all border cursor-help relative group ' + 
                         (activeId() === seg.matchId 
                           ? 'bg-zinc-900 text-white border-zinc-900' 
                           : 'bg-yellow-200 text-zinc-900 border-zinc-900')"
              >
                {{ seg.text }}
                <!-- Instant Hover Stats tooltip -->
                <span class="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-50 bg-zinc-900 text-white font-mono text-[9px] px-2 py-1 rounded shadow-md whitespace-nowrap">
                  Match #{{ seg.matchId }} | Index: {{ seg.index }}
                </span>
              </span>
            } @else {
              <span class="text-zinc-500">{{ seg.text }}</span>
            }
          }
        }
      </div>
    </div>
  `
})
export class MatchHighlighterComponent {
  state = inject(TesterStateService);
  activeId = signal<number | null>(null);
}