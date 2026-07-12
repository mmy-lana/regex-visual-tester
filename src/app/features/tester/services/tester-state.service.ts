import { Injectable, computed, signal } from '@angular/core';
import { RegexMatch, ContentSegment, MatchGroup } from '../../../core/models/regex.model';

@Injectable({
  providedIn: 'root'
})
export class TesterStateService {
  // Pattern initialization matching emails by default
  pattern = signal<string>('\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}\\b');
  flags = signal<string>('g');
  testString = signal<string>('Get in touch with support@example.com or reach our tech team at engineering-list@domain.co.uk! Feedback to feedback@agency.org is welcome.');

  // Compiles regular expression cleanly, outputting errors gracefully
  regexResult = computed(() => {
    const pat = this.pattern();
    const flg = this.flags();
    try {
      if (!pat) {
        return { regex: null, error: 'Please enter a valid search pattern' };
      }
      // Force 'g' flag visually for lists but parse based on current configuration
      const regex = new RegExp(pat, flg.includes('g') ? flg : flg + 'g');
      return { regex, error: null };
    } catch (e: any) {
      return { regex: null, error: e.message || 'Syntax error inside pattern syntax' };
    }
  });

  // Gathers active matches
  matches = computed(() => {
    const { regex, error } = this.regexResult();
    const text = this.testString();
    if (error || !regex || !text) return [];

    const list: RegexMatch[] = [];
    let match;
    let limit = 2000; 

    regex.lastIndex = 0;

    while ((match = regex.exec(text)) !== null && limit-- > 0) {
      if (match.index === regex.lastIndex) {
        regex.lastIndex++; // Handle zero-width matching loops safely
      }

      const groups: MatchGroup[] = match.map((val, idx) => ({
        index: idx,
        value: val || ''
      })).slice(1);

      list.push({
        id: list.length + 1,
        text: match[0],
        index: match.index,
        endIndex: match.index + match[0].length,
        groups
      });

      if (!regex.global) break;
    }
    return list;
  });

  // Generates flat content segments for visually highlighted layout
  segments = computed(() => {
    const text = this.testString();
    const list = this.matches();
    
    if (!text) return [];
    if (list.length === 0) {
      return [{ isMatch: false, text, index: 0 }];
    }

    const segments: ContentSegment[] = [];
    let lastIndex = 0;

    list.forEach(m => {
      if (m.index > lastIndex) {
        segments.push({
          isMatch: false,
          text: text.slice(lastIndex, m.index),
          index: lastIndex
        });
      }
      segments.push({
        isMatch: true,
        text: m.text,
        matchId: m.id,
        index: m.index
      });
      lastIndex = m.endIndex;
    });

    if (lastIndex < text.length) {
      segments.push({
        isMatch: false,
        text: text.slice(lastIndex),
        index: lastIndex
      });
    }

    return segments;
  });
}