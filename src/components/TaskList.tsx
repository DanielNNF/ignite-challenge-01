import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle) return; // não permite criar uma task vazia pq se o valor for false ela ja da retorno não executando o resto do código.
    
    const newTask ={
      id: Math.random(), // pra gerar um id aleatório, porém é apenas um método pra testar , não recomendado o uso 
      title: newTaskTitle,
      isComplete: false // pra não adicionar uma task que ja esteja completa

    }
    setTasks(oldState =>[...oldState, newTask]) // callback que pega as informações anteriores e adiciona uma nova
    setNewTaskTitle('') // Pra resetar o estado assim que for usado 
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const toggleTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete //traz todos valores de task e altera a propriedade
    } : task); // retorna os valores que ja estavam
    setTasks(toggleTask)
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    const removeTasks = tasks.filter(task => task.id !== id ) // retorna as tasks diferente do id 
    setTasks(removeTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}