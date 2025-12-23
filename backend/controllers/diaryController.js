const Diary = require('../models/Diary');

const getAllDiaries = async (req, res) => {
  try {
    const diaries = await Diary.find({ user: req.user._id }).sort({ date: -1 });
    res.json(diaries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createDiary = async (req, res) => {
  try {
    const { title, date, mood, content } = req.body;
    const diary = await Diary.create({
      title,
      date,
      mood,
      content,
      user: req.user._id
    });
    res.status(201).json(diary);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateDiary = async (req, res) => {
  try {
    const { title, date, mood, content } = req.body;
    console.log('Update request body:', req.body);
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (date !== undefined) updateData.date = date;
    if (mood !== undefined) updateData.mood = mood;
    if (content !== undefined) updateData.content = content;
    
    const diary = await Diary.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updateData,
      { new: true }
    );
    
    if (!diary) {
      return res.status(404).json({ message: 'Diary not found' });
    }

    res.json(diary);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteDiary = async (req, res) => {
  try {
    const diary = await Diary.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    
    if (!diary) {
      return res.status(404).json({ message: 'Diary not found' });
    }

    res.json({ message: 'Diary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllDiaries, createDiary, updateDiary, deleteDiary };