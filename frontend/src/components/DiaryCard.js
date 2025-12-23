import { diaryAPI } from '../services/api';

const DiaryCard = ({ diary, onDelete, onEdit }) => {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this diary entry?')) {
      try {
        await diaryAPI.deleteDiary(diary._id);
        onDelete(diary._id);
      } catch (error) {
        alert('Error deleting diary entry');
      }
    }
  };

  return (
    <div className="diary-card">
      <div className="diary-header">
        <h3>{diary.title}</h3>
        <span className="diary-mood">😊 {diary.mood}</span>
      </div>
      <p className="diary-date">{new Date(diary.date).toLocaleDateString()}</p>
      <p className="diary-content">{diary.content}</p>
      <div className="diary-actions">
        <button onClick={() => onEdit(diary)} className="btn-edit">
          Edit
        </button>
        <button onClick={handleDelete} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default DiaryCard;