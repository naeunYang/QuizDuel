import isRoomExists from "../lib/isRoomExists";

export async function generateRoomCode(length = 6): Promise<string> {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  while (true) {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      // Math.random() : 0이상 1미안의 부동소수점 난수 생성 후 반환
      // Math.floor() : 소수점 내림 함수, 정수 부분만 반환

      result += chars[randomIndex];
    }

    if (!(await isRoomExists(result))) {
      break;
    }
  }

  return result;
}
