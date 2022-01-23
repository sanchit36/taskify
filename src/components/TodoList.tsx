import React, { useContext, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { TodoContext } from '../context/Todo';
import { UserContext } from '../context/User';
import { getTasksByUserId, updateTask } from '../firebase/todo';
import { Todo } from '../models/model';
import SingleTodo from './SingleTodo';
import './styles.css';

const TodoList: React.FC = () => {
  const { user } = useContext(UserContext);
  const { active, completed, dispatch } = useContext(TodoContext);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      newActive: Todo[] = [...active],
      newCompleted: Todo[] = [...completed];

    if (source.droppableId === 'active-todos') {
      add = newActive[source.index];
      newActive.splice(source.index, 1);
    } else {
      add = newCompleted[source.index];
      newCompleted.splice(source.index, 1);
    }

    if (destination.droppableId === 'active-todos') {
      updateTask(add.id, { isDone: false });
      add.isDone = false;
      newActive.splice(destination.index, 0, add);
    } else {
      updateTask(add.id, { isDone: true });
      add.isDone = true;
      newCompleted.splice(destination.index, 0, add);
    }

    dispatch({
      type: 'set',
      payload: { active: newActive, completed: newCompleted },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await getTasksByUserId(user?.id!);
        dispatch({ type: 'set', payload: todos });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, user?.id]);

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
              <span className='todos__heading'>
                Active Tasks <strong>{active.length}</strong>
              </span>
              {active.map((todo, index) => (
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
              <span className='todos__heading'>
                Completed Tasks <strong>{completed.length}</strong>
              </span>
              {completed.map((todo, index) => (
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
