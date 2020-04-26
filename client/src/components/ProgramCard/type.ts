interface DescriptionType {
  id: string;
}

export interface ProgramType {
  id: number;
  title: string;
  slug: string;
  overview: string;
  description: DescriptionType;
  sources: string[];
}
