import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesterStateService } from './services/tester-state.service';
import { CardComponent } from '../../shared/components/ui/card/card.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { RegexInputComponent } from './components/regex-input/regex-input.component';
import { TestStringComponent } from './components/test-string/test-string.component';
import { MatchHighlighterComponent } from './components/match-highlighter/match-highlighter.component';
import { ExplanationPanelComponent } from './components/explanation-panel/explanation-panel.component';

@Component({
  selector: 'app-tester',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ButtonComponent,
    RegexInputComponent,
    TestStringComponent,
    MatchHighlighterComponent,
    ExplanationPanelComponent
  ],
  template: `
    <div class="min-h-screen bg-zinc-50 text-zinc-900 antialiased p-4 md:p-8 selection:bg-zinc-900 selection:text-white">
      <div class="max-w-7xl mx-auto space-y-8">
        
        <!-- Documentation-Style Header -->
        <header class="border-b-4 border-zinc-900 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="font-mono text-xs font-bold px-2 py-0.5 bg-zinc-900 text-white rounded">UTILITY</span>
              <span class="font-mono text-xs font-bold text-zinc-500">v1.0.0</span>
            </div>
            <h1 class="text-3xl font-extrabold tracking-tight uppercase font-mono">RegEx Visual Tester</h1>
            <p class="font-mono text-xs text-zinc-500 mt-1 max-w-2xl">
              Clean visual compiler utility to evaluate, run, and break down matching patterns in target strings.
            </p>
          </div>
        </header>

        <!-- Presets Bar -->
        <div class="flex flex-wrap items-center gap-2">
          <span class="font-mono text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mr-2">Presets:</span>
          @for (preset of presets; track preset.name) {
            <app-ui-button (click)="applyPreset(preset)">
              {{ preset.name }}
            </app-ui-button>
          }
        </div>

        <!-- Layout Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <!-- Workspace panel (left) -->
          <div class="lg:col-span-8 space-y-6">
            <app-ui-card title="Compiler Configuration">
              <app-regex-input></app-regex-input>
            </app-ui-card>

            <app-ui-card title="Workspace">
              <div class="space-y-6">
                <app-test-string></app-test-string>
                <div class="border-t border-zinc-200 pt-4">
                  <app-match-highlighter></app-match-highlighter>
                </div>
              </div>
            </app-ui-card>
          </div>

          <!-- Documentation Breakdown Panel (right) -->
          <div class="lg:col-span-4">
            <app-ui-card title="Breakdown & Guide">
              <app-explanation-panel></app-explanation-panel>
            </app-ui-card>
          </div>
          
        </div>
      </div>
    </div>
  `
})
export class TesterComponent {
  state = inject(TesterStateService);

  presets = [
    {
      name: 'Email Address Parser',
      pattern: '\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b',
      flags: 'g',
      text: 'Send details to sales@company.com or engineering@domain.co.jp. Send invoices directly to payment-team@finance.org.'
    },
    {
      name: 'ISO Date format (YYYY-MM-DD)',
      pattern: '\\b\\d{4}-\\d{2}-\\d{2}\\b',
      flags: 'g',
      text: 'Operations scheduled for launch on 2026-07-25. The deadline is fixed on 2026-11-12 with updates due by 2027-01-10.'
    },
    {
      name: 'Inline HTML Tags matcher',
      pattern: '<\\/?[a-z][a-z0-9]*\\b[^>]*>',
      flags: 'gi',
      text: 'Check this out: <div>Welcome to <b>Angular Standalone</b> design paradigms. Have <i>fun</i>!</div>'
    }
  ];

  applyPreset(preset: typeof this.presets[0]) {
    this.state.pattern.set(preset.pattern);
    this.state.flags.set(preset.flags);
    this.state.testString.set(preset.text);
  }
}