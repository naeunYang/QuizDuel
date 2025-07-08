export interface Category {
  categoryID: string;
  categoryName: string;
}

export interface Count {
  countID: number;
  countName: string;
}

export interface Level {
  levelID: string;
  levelName: string;
}

export interface Time {
  timeID: number;
  timeName: string;
}

export interface RoomOption {
  categories: Category[];
  counts: Count[];
  levels: Level[];
  times: Time[];
}
