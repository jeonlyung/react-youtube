const express = require('express');
const router = express.Router();

const { Subscriber } = require("../models/Subscriber")

//=================================
//             Subscribe
//=================================

//구독자수 조회하기
router.post('/subscribeNumber', (req, res) => {

    Subscriber.find({ 'userTo': req.body.userTo })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);

            return res.status(200).json({ success: true, subscribeNumber: subscribe.length });
        });
    
})

//구독 여부 조회하기
router.post('/subscribed', (req, res) => {

    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err);

            let result = false;
            if (subscribe.length > 0) {
                result = true;
            }

            return res.status(200).json({ success: true, subscribed: result });
        });

})

//구독 취소하기
router.post('/unSubscribe', (req, res) => {
    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })

            return res.status(200).json({ success: true, doc });
        });
})

//구독 하기
router.post('/subscribe', (req, res) => {

    Subscriber.findOneAndDelete({ userTo: req.body.userTo, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err })

            return res.status(200).json({ success: true, doc });
        });
})



module.exports = router;