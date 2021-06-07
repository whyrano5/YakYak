'use strict';
const { Router } = require('express');
const router = Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

router.use('/about', require('./about'));
router.use('/free', require('./free'));
router.use('/free_write', require('./free/com_free_write'));
router.use('/free_detail', require('./free/com_free_detail'));
router.use('/free_update', require('./free/com_free_update'));
router.use('/free_delete', require('./free/com_free_delete'))
router.use('/question', require('./question'));
router.use('/question_write', require('./question/com_question_write'));
router.use('/question_detail', require('./question/com_question_detail'));
router.use('/question_update', require('./question/com_question_update'));
router.use('/question_delete', require('./question/com_question_delete'))
router.use('/review', require('./review'));
router.use('/review_write', require('./review/com_review_write'));
router.use('/review_detail', require('./review/com_review_detail'));
router.use('/review_update', require('./review/com_review_update'));
router.use('/review_delete', require('./review/com_review_delete'))
router.use('/contact', require('./contact'));
router.use('/index', require('./index/index'));
router.use('/inquiry', require('./inquiry'));
router.use('/login', require('./login'));
router.use('/Find_id', require('./login/Find_id'));
// router.use('/Find_pw', require('./login/Find_pw'));
router.use('/logout', require('./login/logout'));
router.use('/sign', require('./login/sign'));
router.use('/member', require('./member'));
router.use('/naga', require('./naga'));
router.use('/naga2', require('./naga2'));
router.use('/profile', require('./profile'));
router.use('/notice', require('./notice'));
router.use('/notice_write', require('./notice/notice_write'));
router.use('/notice_detail', require('./notice/notice_detail'));
router.use('/notice_update', require('./notice/notice_update'));
router.use('/notice_delete', require('./notice/notice_delete'))

module.exports = router;