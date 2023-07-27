import { useRef } from "react"
import { useBoundStore } from "../../store/store"

const TodoList = () => {
  const todos = useBoundStore(state => state.todos)
  const addTodo = useBoundStore(state => state.addTodo)
  const completeTodo = useBoundStore(state => state.completeTodo)

  const inputRef = useRef(null)

  const handleAddTodo = () => {
    if (!inputRef.current.value) {
      return
    }

    addTodo({
      id: Date.now(),
      text: inputRef.current.value,
      completed: false
    })

    inputRef.current.value = ''
  }

  const handleTodoComplete = (id) => {
    completeTodo(id)
  }

  return (
    <div>
      <h1 className="text-xl">Todo List</h1>
      <div className="mt-2">
        <input type="text" placeholder="Add a new todo" className="px-2 py-1 rounded bg-neutral-800" defaultValue="" ref={inputRef}/>
        <button className="bg-purple-600 px-6 py-1 rounded ml-4" onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="mt-5" aria-label="Todo list">
        {todos.map(todo => (
          <TodoItem key={todo.id} onComplete={handleTodoComplete} todo={todo} />
        ))}
      </ul>
    </div>
  )
}

const TodoItem = ({ todo, onComplete }) => {
  return (
    <li className={`flex items-center justify-between mt-2 bg-neutral-700 rounded px-4 py-1 hover:opacity-70 cursor-pointer transition ${todo.completed ? 'line-through opacity-70' : ''}`} onClick={() => onComplete(todo.id)}>
      {todo.text}
    </li>
  )
}

export default TodoList