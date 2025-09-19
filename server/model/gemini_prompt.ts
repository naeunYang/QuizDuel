export default function geminiPrompt(
  type: string,
  category: string,
  level: string,
  cnt: string
) {
  return `
      퀴즈 문제를 JSON 배열 형식으로 출력해줘. 코드 블록(\`\`\`)으로 감싸지 말고, 순수 JSON 텍스트만 출력해줘. 아래에는 속성 정보가 담겨 있고 그 밑에는 생성 조건이야. 조건이 "random" 이나 "-1"이면 랜덤으로 생성해줘.

      [속성 정보]
         1. type
            - OX퀴즈는 "0"
            - 객관식 퀴즈는 "1"
         2. categoryID
            - 만화는 "comic"
            - 드라마는 "drama"
            - 이모지는 "emoji" -> 이모지 퀴즈는 예를 들어 🐼💪🥋👊이 뭘까요? 정답은.. 쿵푸팬더입니다! 이런 난이도로 작성해줘. 이 예는 사용하지 마.
            - 요즘 밈은 "meme"
            - 추억은 "memory" -> 정해진 유형은 딱히 없고 그냥 옛날에 90년대나 2000년대에 유행하던 퀴즈나 과자 등등 이런 문제들.
            - 영화는 "movie"
            - 신조어는 "slang"
         3.  levelID
            - "상"은 "high"
            - "중"은 "medium"
            - "하"는 "low"
         4. status
            - 전부 "0"으로 설정
         5. content
            - 문제
         6. explanation
            - 해설
         7. answer
            - 정답
         8. choices(jsonb)
            - 선택지
            - OX퀴즈라면 ["O", "X"]로 객관식 퀴즈라면 예를 들어 ["조선", "고려", "스모", "카라"] 이런 형식으로 4개만 작성
         9. check
            - 전부 false로 설정

      [생성 조건]
         1. 문제 형식: ${type}
         2. 카테고리: ${category}
         3. 난이도: ${level}
         4. 문제 수: ${cnt}
   `;
}
