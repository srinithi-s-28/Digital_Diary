import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import DiaryCard from '../components/DiaryCard';
import EditDiaryForm from '../components/EditDiaryForm';
import { diaryAPI } from '../services/api';

const Dashboard = () => {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDiary, setEditingDiary] = useState(null);

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    try {
      const response = await diaryAPI.getAllDiaries();
      setDiaries(response.data);
    } catch (error) {
      console.error('Error fetching diaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (diaryId) => {
    setDiaries(diaries.filter(diary => diary._id !== diaryId));
  };

  const handleEdit = (diary) => {
    setEditingDiary(diary);
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await diaryAPI.updateDiary(editingDiary._id, formData);
      setDiaries(diaries.map(d => d._id === editingDiary._id ? response.data : d));
      setEditingDiary(null);
    } catch (error) {
      alert('Error updating diary entry');
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="loading">Loading your diary entries...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="dashboard-header">
          <h1>My Diary Entries</h1>
          <p>Total entries: {diaries.length}</p>
        </div>
        
        {editingDiary && (
          <EditDiaryForm 
            diary={editingDiary} 
            onUpdate={handleUpdate}
            onCancel={() => setEditingDiary(null)}
          />
        )}
        
        <div className="diary-grid">
          {diaries.length === 0 ? (
            <div className="no-entries">
              <p>No diary entries yet. Start writing your first entry!</p>
            </div>
          ) : (
            diaries.map(diary => (
              <DiaryCard
                key={diary._id}
                diary={diary}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;