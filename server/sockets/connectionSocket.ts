import WebSocket from "ws";
import type { ExtendedWebSocket } from "../types/extended-websocket.type";
import { generateRoomCode } from "../util/generateRoomCode";
import { getRedisClient } from "../util/redisClient";

type RoomInfo = {
  roomCode: string;
  users: string[];
};

// #region 디비 작업 메서드

async function saveRoom(roomInfo: RoomInfo) {
  try {
    const redis = await getRedisClient();
    await redis.hSet(roomInfo.roomCode, {
      users: JSON.stringify(roomInfo.users),
    });
  } catch (err) {
    console.log("saveRoom 실패: ", err);
  }
}

async function isRoomExists(roomCode: string) {
  try {
    const redis = await getRedisClient();
    const isExists = await redis.exists(roomCode);

    if (isExists) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("isRoomExists 실패: ", err);
  }
}

async function getRoom(roomCode: string) {
  try {
    const redis = await getRedisClient();
    const result = await redis.hGet(roomCode, "users");

    let users;

    if (result) {
      users = JSON.parse(result);
    }

    return users;
  } catch (err) {
    console.log("getRoom 실패: ", err);
  }
}

async function deleteRoom(roomCode: string) {
  try {
    const redis = await getRedisClient();

    await redis.del(roomCode);
  } catch (err) {
    console.log("deleteRoom 실패: ", err);
  }
}

// #endregion

// 현재 모든 방의 상태를 저장하는 공간 -> redis에 저장 예정
const socketInfo = new Map<string, WebSocket>();

export default function handleWebSocketConnection(wss: WebSocket.Server) {
  // .on : 이벤트 핸들러를 등록하는 메서드
  wss.on("connection", (ws: ExtendedWebSocket) => {
    // connection : 클라이언트가 접속 성공했을 때 발생
    // ws : 방금 연결된 그 한 클라이언트와 통신할 수 있는 WebSocket 연결 객체

    console.log("====   WebSocket is Connected...!!!   ====");

    // message : 클라이언트가 서버에게 메시지를 보냈을 때 실행되는 이벤트
    ws.on("message", async (msg) => {
      const data = JSON.parse(msg.toString()); // JSON.parse : String -> 객체, ws 서버는 기본적으로 모든 수신 메시지를 Buffer로 처리하기 때문에 toString()으로 문자열 변환 처리를 해줘야 함

      if (data.type == "create") {
        const roomCode = generateRoomCode();
        await saveRoom({ roomCode: roomCode, users: [] });

        ws.send(
          JSON.stringify({
            type: "success",
            message: "방을 성공적으로 생성했습니다.",
            roomCode: roomCode,
          })
        );
      } else if (data.type === "join") {
        const { userId, roomCode } = data;

        // 해당하는 방이 없을 경우
        if (!(await isRoomExists(roomCode))) {
          ws.send(
            JSON.stringify({
              type: "room_not_found",
              message: "방을 찾을 수 없습니다.",
            })
          );
          ws.close();
          return;
        }
        // 해당하는 방이 존재할 경우
        else {
          let users = await getRoom(roomCode);

          if (users.length >= 2) {
            ws.send(
              JSON.stringify({
                type: "room_full",
                message: "방이 가득 찼습니다.",
              })
            );
            ws.close();
            return;
          } else {
            // 소켓 객체 저장
            ws.userId = userId;
            ws.roomCode = roomCode;
            socketInfo.set(userId, ws);

            users.push(userId);
            saveRoom({ roomCode: roomCode, users: users });

            users = await getRoom(roomCode);
            console.log(`[${roomCode}] 현재 접속 유저:`, users);

            if (users.length == 2) {
              users.forEach((user: string) => {
                const socket = socketInfo.get(user);
                socket?.send(
                  JSON.stringify({
                    type: "ready",
                    connCompleted: true,
                  })
                );
              });
            }
          }
        }
      }
    });

    ws.on("close", async () => {
      console.log("====   WebSocket is Disconnected...!!!   ====");

      if (ws.roomCode) {
        let users = await getRoom(ws.roomCode);

        if (users.length > 1) {
          await saveRoom({
            roomCode: ws.roomCode,
            users: users.filter((user: string) => user !== ws.userId),
          });
        } else {
          console.log(`방이 비었습니다. [${ws.roomCode}] 방이 삭제됩니다.`);
          await deleteRoom(ws.roomCode);
        }
        users = await getRoom(ws.roomCode);
        console.log(users);

        if (ws.userId) {
          socketInfo.delete(ws.userId);
        }
      }
    });
  });
}
