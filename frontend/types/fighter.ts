export interface Fight {
  opponent: string;
  result: 'Win' | 'Loss' | 'Draw' | 'NC';
  method: string;
  round: number;
  date: string;
  event: string;
}

export interface Fighter {
  id: number;
  name: string;
  nickname: string;
  image: string;
  weightClass: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  currentFormRating: number;
  nationality: string;
  age: number;
  height: string;
  reach: string;
  stance: string;
  recentFights: Fight[];
  stats: {
    strikesLandedPerMinute: number;
    strikingAccuracy: number;
    takedownAverage: number;
    takedownAccuracy: number;
    submissionAverage: number;
  };
}
