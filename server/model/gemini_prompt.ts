export default function geminiPrompt(
  type: string,
  category: string,
  level: string,
  cnt: string,
  categories: {
    categoryID: string;
    categoryName: string;
    description: string | null;
  }[],
  quizList: { content: string }[]
) {
  return `
      퀴즈 문제를 JSON 배열 형식으로 출력해줘. 코드 블록(\`\`\`)으로 감싸지 말고, 순수 JSON 텍스트만 출력해줘. 아래에는 속성 정보가 담겨 있고 그 밑에는 생성 조건이야. 조건이 "random" 이나 "-1"이면 랜덤으로 생성해줘.
      그리고 이미 존재하는 퀴즈 리스트를 보고 중복되는 퀴즈는 생성하지 마.

      [속성 정보]
         1. type
            - OX퀴즈는 "0"
            - 객관식 퀴즈는 "1"
         2. categoryID
            - ${JSON.stringify(categories)}
            - 위의 category목록의 categoryName과 description을 보고 categoryID로 설정.
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

      [이미 존재하는 퀴즈 리스트]
         ${JSON.stringify(quizList)}
   `;
}
