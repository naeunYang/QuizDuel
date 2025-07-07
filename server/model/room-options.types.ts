export interface Category {
  categoryID: string;
  categoryName: string;
}

export interface Count {
  countID: string;
  countName: string;
}

export interface Level {
  levelID: string;
  levelName: string;
}

export interface Time {
  timeID: string;
  timeName: string;
}

export interface RoomOption {
  categories: Category[];
  counts: Count[];
  levels: Level[];
  times: Time[];
}
