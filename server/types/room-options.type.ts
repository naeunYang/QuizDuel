export interface Category {
  categoryID: string;
  categoryName: string;
}

export interface Count {
  seq: string;
  countName: string;
}

export interface Level {
  seq: number;
  levelID: string;
  levelName: string;
}

export interface Time {
  seq: string;
  timeName: string;
}

export interface RoomOption {
  categories: Category[];
  counts: Count[];
  levels: Level[];
  times: Time[];
}
