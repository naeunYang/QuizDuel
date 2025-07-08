import express from "express";
import * as homeController from "../controller/home"; // 해당 모듈의 모든 export를 한 객체로 가져온다

const router = express.Router(); // 특정 라우트 그룹(/home) 안에서 또 다른 하위 경로들(/home/room-options 등)을 분리해서 관리하는 역할

// routes는 경로만, controller는 실제 처리 로직 담당(라우터와 로직 분리)
router.get("/room-options", homeController.getRoomOptions);

export default router;
