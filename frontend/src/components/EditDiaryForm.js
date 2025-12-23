import { useState } from 'react';

const EditDiaryForm = ({ diary, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: diary.title || '',
    date: diary.date ? diary.date.split('T')[0] : '',
    mood: diary.mood || 'Happy',
    content: diary.content || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data being sent:', formData);
    onUpdate(formData);
  };

  return (
    <div className="edit-form-overlay">
      <div className="edit-form">
        <h3>Edit Diary Entry</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Mood</label>
            <select
              value={formData.mood}
              onChange={(e) => setFormData({...formData, mood: e.target.value})}
              required
            >
              <option value="Happy">😊 Happy</option>
              <option value="Sad">😢 Sad</option>
              <option value="Excited">🤩 Excited</option>
              <option value="Calm">😌 Calm</option>
              <option value="Anxious">😰 Anxious</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows="8"
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn-primary">Update</button>
            <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDiaryForm;