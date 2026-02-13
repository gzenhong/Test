
export interface Attraction {
  name: string;
  description: string;
  imageUrl: string;
  tag: string;
  time: string;
}

export interface DayPlan {
  day: number;
  title: string;
  description: string;
  attractions: Attraction[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}
