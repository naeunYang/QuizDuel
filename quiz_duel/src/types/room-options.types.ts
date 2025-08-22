export interface Category {
  categoryID: string;
  categoryName: string;
}

export interface Count {
  seq: number;
  countName: string;
}

export interface Level {
  seq: number;
  levelID: string;
  levelName: string;
}

export interface Time {
  seq: number;
  timeName: string;
}

export interface RoomOption {
  categories: Category[];
  counts: Count[];
  levels: Level[];
  times: Time[];
}
