/**
 * ENTREPRENEURIAL JOURNEY — timeline on the homepage.
 * Replace [placeholders] with real dates and events. Add or remove entries freely.
 */
export type JourneyEntry = {
  stage: string;
  year: string;
  title: string;
  text: string;
};

export const journey: JourneyEntry[] = [
  {
    stage: "Ideas",
    year: "[Year]",
    title: "Where it started",
    text: "[The first idea or moment that pointed Ram towards entrepreneurship.]",
  },
  {
    stage: "Starting ventures",
    year: "[Year]",
    title: "The first venture",
    text: "[Which venture came first, and what problem it set out to solve.]",
  },
  {
    stage: "Building businesses",
    year: "[Year]",
    title: "Building the companies",
    text: "[Key milestones while building Trovity Insurance, Mad Over Insurance, Redcrabs and Call Me OOO.]",
  },
  {
    stage: "Expanding opportunities",
    year: "[Year]",
    title: "Growing further",
    text: "[New markets, partnerships, teams or products — add verified milestones only.]",
  },
  {
    stage: "Future vision",
    year: "Next",
    title: "What comes next",
    text: "[Where Ram is taking his ventures in the coming years.]",
  },
];
