export const mockDataCount = [
  {
    name: "5개",
    value: "5",
  },
  {
    name: "10개",
    value: "10",
  },
  {
    name: "15개",
    value: "15",
  },
  {
    name: "20개",
    value: "20",
  },
  {
    name: "30개",
    value: "30",
  },
] as const;

export const mockDataLevel = [
  {
    name: "상",
    value: "high",
  },
  {
    name: "중",
    value: "medium",
  },

  {
    name: "하",
    value: "low",
  },
] as const;

export const mockDataCategory = [
  {
    name: "랜덤",
    value: "random",
  },
  {
    name: "요즘 밈",
    value: "meme",
  },
  {
    name: "드라마",
    value: "drama",
  },
  {
    name: "영화",
    value: "movie",
  },
  {
    name: "만화",
    value: "comic",
  },
  {
    name: "넌센스",
    value: "nonsense",
  },
  {
    name: "신조어",
    value: "slang",
  },
  {
    name: "이모지",
    value: "emoji",
  },
  {
    name: "추억",
    value: "memory",
  },
] as const;

export const mockDataTime = [
  {
    name: "5초",
    value: "5",
  },
  {
    name: "10초",
    value: "10",
  },
  {
    name: "15초",
    value: "15",
  },
  {
    name: "20초",
    value: "20",
  },
  {
    name: "30초",
    value: "30",
  },
] as const;

export type QuizCount = (typeof mockDataCount)[number]["value"];
export type Level = (typeof mockDataLevel)[number]["value"];
export type Category = (typeof mockDataCategory)[number]["value"];
export type TimeLimit = (typeof mockDataTime)[number]["value"];
