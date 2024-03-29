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