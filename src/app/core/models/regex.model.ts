export interface MatchGroup {
  index: number;
  value: string;
}

export interface RegexMatch {
  id: number;
  text: string;
  index: number;
  endIndex: number;
  groups: MatchGroup[];
}

export interface ContentSegment {
  isMatch: boolean;
  text: string;
  matchId?: number;
  index: number;
}