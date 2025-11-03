import ToDoItem from "../ToDoItem/ToDoItem";
import type { ToDo } from "../../models/interfaces";
import { useState } from "react";

interface ToDoListProps {
  toDos: ToDo[];
  onToggle(id: number): void;
  onDelete(id: number): void;
  onEdit(id: number, title: string): void;
}

function ToDoList({ toDos, onToggle, onDelete, onEdit }: ToDoListProps) {
  const [filter, setFilter] = useState("all");

  const visibleToDos = toDos.filter((toDo) => {
    if (filter === "done") return toDo.done === true;
    if (filter === "undone") return toDo.done === false;
    return true;
  });

  return (
    <>
      <label htmlFor="filter"></label>
      <select
        name="filter"
        id="filter"
        onChange={(event) => setFilter(event.target.value)}
      >
        <option value="all">Все</option>
        <option value="done">Выполнено</option>
        <option value="undone">Не выполнено</option>
      </select>
      <ul>
        {visibleToDos.map((toDo) => (
          <li key={toDo.id}>
            <ToDoItem
              id={toDo.id}
              title={toDo.title}
              done={toDo.done}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </li>
        ))}
      </ul>
      <p>Осталось {toDos.filter((t) => !t.done).length} задач</p>
    </>
  );
}

export default ToDoList;
