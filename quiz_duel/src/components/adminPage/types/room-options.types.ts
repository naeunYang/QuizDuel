export interface Type {
  typeID: string;
  typeName: string;
}

export interface Category {
  categoryID: string;
  categoryName: string;
}

export interface Level {
  seq: number;
  levelID: string;
  levelName: string;
}

export interface State {
  stateID: string;
  stateName: string;
}

export interface RoomOption {
  types: Type[];
  categories: Category[];
  levels: Level[];
  states: State[];
}

export interface OptionData {
  id: string | number;
  value: string;
}
