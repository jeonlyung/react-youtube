const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");
const { Auth } = require("../middleware/auth");
//파일 저장 라이브러리
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {//uploads폴더에 저장
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {//파일이름 설정
        //파일이름 인코딩 깨짐현상(multer 버전 --> 1.4.4로 변경)
        //백틱(`) 내부에서 ${}으로 변수나 표현식을 감싸면 해당 값이 문자열에 포함
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

//파일 필터
const fileFilter = (req, file, cb) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];
    if (fileType == 'mp4') {
        cb(null, true);
    } else {
        //한글 깨짐(to-be:처리)
        cb({ msg: 'only mp4'}, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } //크기제한 : 10MB
}).single("file");

//=================================
//             Video
//=================================

//비디오 업로드 파일 저장
router.post('/uploadfiles', (req, res) => {
    //비디오를 서버에 저장한다.
    upload(req, res, err => {
        if (err) {
            console.log(err);
            return res.json({ success: false, errorText: err.msg });
        }

        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    })
})


//비디오 데이터를 DB에서 가져와서 클라이언트에 보낸다.
router.get('/getVideos', (req, res) => {

    //비디오 데이터를 DB에서 가져와서 클라이언트에 보낸다.
    Video.find()
        .populate('writer')
        .exec((err, videos) => {
            if (err) { return res.status(400).send(err) }

            res.status(200).json({ success: true, videos });
        })
        
    
})


//썸네일 생성
router.post('/thumbnail', (req, res) => {

    //썸네일 생성하고 비디오 러닝타임도 가져오기

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    });

    //썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log(filenames);

            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log("Sccrennshot taken");
            return res.json({ success: true, url: filePath, fileDuration: fileDuration });
        })
        .on('error', function (err) {
            console.error(err);
            return res.json({ success: false, err });
        })
        .screenshot({
            count: 3,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename:'thumbnail-%b.png'
        })
})

//비디오 업로드 정보들을 저장
router.post('/uploadVideo', (req, res) => {

    //비디오 정보들을 저장한다.
    const video = new Video(req.body);
    video.save((err, doc) => {
        if (err) return res.json({ success: false, err });

        res.status(200).json({ success: true });
    })
})

module.exports = router;