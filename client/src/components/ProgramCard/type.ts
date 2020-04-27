interface DescriptionType {
  id: string;
  content_type: string;
}

export interface ProgramType {
  id: number;
  title: string;
  slug: string;
  overview: string;
  description: DescriptionType;
  sources: string[];
}
