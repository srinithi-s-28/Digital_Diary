const express = require('express');
const { getAllDiaries, createDiary, updateDiary, deleteDiary } = require('../controllers/diaryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getAllDiaries);
router.post('/', createDiary);
router.put('/:id', updateDiary);
router.delete('/:id', deleteDiary);

module.exports = router;