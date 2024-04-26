import { TodoItem } from "./todoItem"

export function TodoList({todos, toggleTodo, deleteTodo}) {
    return (
        <ul className="list">
    {todos.length === 0 && "No Todos"}
    {todos.map(todo => {
      return (
        <TodoItem {...todo}  key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      )
      // BREAKED UP CODE INTO PARTS, CODE BELOW ARE IN TODOITEM.JSX 
    //   <li key={todo.id}>
    //   <label >
    //     <input type="checkbox" checked={todo.completed}
    //     // onChange={e => toggleTodo(todo.id, e.target.checked)}
    //     />
    //     {todo.title}
    //   </label>
    //   <button 
    // //   onClick={() => deleteTodo(todo.id)} 
    //   className="btn btn-danger" >Delete</button>
    // </li>
    
    })}
    
  </ul>
    )
}