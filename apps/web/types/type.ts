export type Experience = {
  Company: string;
  Role: string;
  From: string;
  To?: string;
  TechStack: string[];
  RoleHighlights: string[];
}

type Reference = {
  provider: string;
  url: string;
}

export type Skill = {
  Name: string;
  Introduction: string;
  Proficiency: string;
  Experience: string;
  References: Reference[];
}

export type traits = {
  introverted: number;
  observant: number;
  feeling: number;
  judging: number;
  assertive: number;
}

export type Personality = {
  provider: string;
  type: string;
  traits: traits;
  reportLink: string;
}