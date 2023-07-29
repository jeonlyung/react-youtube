const express = require('express');
const router = express.Router();
/*
const { User } = require("../models/Video");
const { auth } = require("../middleware/auth");
*/
//파일 저장 라이브러리
const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {//uploads폴더에 저장
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {//파일이름 설정
        //백틱(`) 내부에서 ${}으로 변수나 표현식을 감싸면 해당 값이 문자열에 포함
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {//파일 필터(확장자)
        /*if (file.mimetype == 'video/mp4') {
            cb(null, true);
        } else {
            cb(res.status(400).end('mp4파일만 가능합니다.'), false);
        }*/
        const ext = path.extname(file.originalname);
        if (ext !== '.mp4') {
            return cb(res.status(400).end('mp4파일만 가능합니다.'), false);
        }
        cb(null, true);
    }
})

const upload = multer({ storage: storage }).single("file");
//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    //비디오를 서버에 저장한다.
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }

        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    })
})

module.exports = router;