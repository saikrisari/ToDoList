import "../../styles/style.css";
import { useState } from "react";

interface ToDoItemProps {
  id: number;
  title: string;
  done: boolean;
  onToggle(id: number): void;
  onDelete(id: number): void;
  onEdit(id: number, title: string): void;
}

function ToDoItem({
  id,
  title,
  done,
  onToggle,
  onDelete,
  onEdit,
}: ToDoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleSave = () => {
    onEdit(id, editedTitle);
    setIsEditing(false);
  };

  return (
    <>
      <div className="wrapper">
        <input
          type="checkbox"
          name="done"
          checked={done}
          onClick={() => onToggle(id)}
        />

        {isEditing === false ? (
          <p>{title}</p>
        ) : (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(event) => setEditedTitle(event.target.value)}
            />
            <button type="button" onClick={handleSave}>
              Сохранить
            </button>
          </>
        )}
        {!isEditing && (
            <button type="button" onClick={() => setIsEditing(true)}>
          Редактировать
        </button>
        )}
        <button type="button" onClick={() => onDelete(id)}>
          Удалить
        </button>
      </div>
    </>
  );
}

export default ToDoItem;
