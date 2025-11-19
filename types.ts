export interface ReportMetadata {
  organizationName: string;
  author: string;
  facilities: string;
  dateCompleted: string;
  nextReviewDate: string;
}

export interface TechnicalACMEntry {
  id: string;
  subject: string;
  object: string;
  permission: string;
}

export interface SharedRMEntry {
  id: string;
  subject: string;
  object: string;
  permission: string;
  partner: string;
}

export interface CMMCModelEntry {
  id: string;
  subjectId: string;
  object: string;
  permission: string;
  justification: string;
  evidenceLink: string;
}

export type TabView = 'intro' | 'tech' | 'shared' | 'cmmc' | 'report';

export interface AppState {
  metadata: ReportMetadata;
  techEntries: TechnicalACMEntry[];
  sharedEntries: SharedRMEntry[];
  cmmcEntries: CMMCModelEntry[];
}
