import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { diaryAPI } from '../services/api';

const AddDiary = () => {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    mood: 'Happy',
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await diaryAPI.createDiary(formData);
      navigate('/dashboard');
    } catch (error) {
      alert('Error creating diary entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="add-diary-form">
          <h1>✍️ Write New Diary Entry</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Give your entry a title..."
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Mood</label>
              <select name="mood" value={formData.mood} onChange={handleChange} required>
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
                name="content"
                placeholder="Write your thoughts..."
                value={formData.content}
                onChange={handleChange}
                rows="10"
                required
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? 'Saving...' : 'Save Entry'}
              </button>
              <button 
                type="button" 
                onClick={() => navigate('/dashboard')} 
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDiary;