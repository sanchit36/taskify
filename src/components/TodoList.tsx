import React, { useContext } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { TodoContext } from '../context/Todo';
import { Todo } from '../models/model';
import SingleTodo from './SingleTodo';
import './styles.css';

const TodoList: React.FC = () => {
  const { todos, dispatch } = useContext(TodoContext);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active: Todo[] = [...todos.active],
      completed: Todo[] = [...todos.completed];

    if (source.droppableId === 'active-todos') {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === 'active-todos') {
      add.isDone = false;
      active.splice(destination.index, 0, add);
    } else {
      add.isDone = true;
      completed.splice(destination.index, 0, add);
    }

    dispatch({ type: 'set', payload: { active, completed } });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='container'>
        <Droppable droppableId='active-todos'>
          {(provider, snapshot) => (
            <div
              className={`todos ${
                snapshot.isDraggingOver ? 'drag-active' : ''
              }`}
              ref={provider.innerRef}
              {...provider.droppableProps}
            >
              <span className='todos__heading'>Active Tasks</span>
              {todos.active.map((todo, index) => (
                <SingleTodo key={todo.id} index={index} todo={todo} />
              ))}
              {provider.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId='completed-todos'>
          {(provider, snapshot) => (
            <div
              className={`todos completed ${
                snapshot.isDraggingOver ? 'drag-complete' : ''
              }`}
              ref={provider.innerRef}
              {...provider.droppableProps}
            >
              <span className='todos__heading'>Completed Tasks</span>
              {todos.completed.map((todo, index) => (
                <SingleTodo key={todo.id} index={index} todo={todo} />
              ))}
              {provider.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TodoList;
