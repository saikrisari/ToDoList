import ToDoForm from "./components/ToDoForm/ToDoForm";
import ToDoList from "./components/ToDoList/ToDoList";
import { useEffect, useState } from "react";
import type { ToDos } from "./models/interfaces";

function App() {
  const [toDos, setToDos] = useState<ToDos>(() => {
    const initial = localStorage.getItem("ToDoList");
    if (typeof initial === "string") {
      return JSON.parse(initial);
    } else {
      return [];
    }
  });

  useEffect(() => {
    const changed = JSON.stringify(toDos);
    localStorage.setItem("ToDoList", changed);
  }, [toDos]);

  const addToDo = (title: string): void => {
    const newToDo = {
      id: Date.now(),
      title,
      done: false,
    };

    if (newToDo.title !== "") {
      const readyToDos = [...toDos, newToDo];
      setToDos(readyToDos);
    } else {
      alert("Введите название!");
    }
  };

  const deleteToDo = (id: number): void => {
    const filteredToDos = toDos.filter((toDo) => toDo.id !== id);
    setToDos(filteredToDos);
  };

  const editToDo = (id: number, title: string): void => {
    const editedToDos = toDos.map((toDo) => {
      if (toDo.id === id) {
        return {
          id: toDo.id,
          title: title,
          done: toDo.done,
        };
      } else {
        return toDo;
      }
    });
    setToDos(editedToDos);
  };

  const toggleDone = (id: number): void => {
    const toggledToDo = toDos.map((toDo) => {
      if (toDo.id === id) {
        return { id: toDo.id, title: toDo.title, done: !toDo.done };
      } else {
        return toDo;
      }
    });
    setToDos(toggledToDo);
  };

  return (
    <>
      <ToDoForm onAdd={addToDo} />
      <ToDoList
        toDos={toDos}
        onToggle={toggleDone}
        onDelete={deleteToDo}
        onEdit={editToDo}
      />
    </>
  );
}

export default App;
