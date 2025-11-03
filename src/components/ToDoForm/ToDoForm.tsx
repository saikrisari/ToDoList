import { useState } from "react";

interface ToDoFormProps {
  onAdd: (arg: string) => void;
}

function ToDoForm({ onAdd }: ToDoFormProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(inputValue);
    setInputValue("");
  };

  return (
    <form className="form" action="POST" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Новая задача"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button type="submit">Добавить задачу</button>
    </form>
  );
}

export default ToDoForm;
