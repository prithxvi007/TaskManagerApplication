// App.js
import {useState} from 'react'
import {v4 as uuidv4} from 'uuid' // Import UUID for unique task IDs
import './App.css'

const tagsList = [
  {optionId: 'HEALTH', displayText: 'Health'},
  {optionId: 'EDUCATION', displayText: 'Education'},
  {optionId: 'ENTERTAINMENT', displayText: 'Entertainment'},
  {optionId: 'SPORTS', displayText: 'Sports'},
  {optionId: 'TRAVEL', displayText: 'Travel'},
  {optionId: 'OTHERS', displayText: 'Others'},
]

const App = () => {
  const [taskText, setTaskText] = useState('')
  const [optionTag, setOptionTag] = useState(tagsList[0].optionId)
  const [tasks, setTasks] = useState([])
  const [activeTag, setActiveTag] = useState(null)

  // Handler for task text input change
  const onChangeTaskText = event => {
    setTaskText(event.target.value)
  }

  // Handler for tag selection change
  const onChangeTag = event => {
    setOptionTag(event.target.value)
  }

  // Handler to add a new task
  const onAddTask = event => {
    event.preventDefault()
    if (taskText.trim() !== '') {
      const newTask = {
        id: uuidv4(),
        text: taskText,
        tag: optionTag,
      }
      setTasks(prevTasks => [...prevTasks, newTask])
      setTaskText('') // Reset task text input
      setOptionTag(tagsList[0].optionId) // Reset tag select to default
    }
  }

  // Handler to set an active tag for filtering
  const onTagClick = tagId => {
    setActiveTag(prevTag => (prevTag === tagId ? null : tagId))
  }

  // Filter tasks based on active tag
  const filteredTasks = activeTag
    ? tasks.filter(task => task.tag === activeTag)
    : tasks

  return (
    <div className="task-todo-bg-container">
      <div className="task-create-card-container">
        <h1 className="task-create-heading">Create a task!</h1>
        <form className="task-form" onSubmit={onAddTask}>
          <label htmlFor="task" className="task-label">
            Task
          </label>
          <br />
          <input
            id="task"
            className="task-input-el"
            type="text"
            placeholder="Enter the task here"
            value={taskText}
            onChange={onChangeTaskText}
          />
          <br />
          <label htmlFor="tag" className="task-label">
            Tags
          </label>
          <br />
          <select
            id="tag"
            className="task-select-el"
            value={optionTag}
            onChange={onChangeTag}
          >
            {tagsList.map(tag => (
              <option key={tag.optionId} value={tag.optionId}>
                {tag.displayText}
              </option>
            ))}
          </select>
          <br />
          <button type="submit" className="task-add-btn">
            Add Task
          </button>
        </form>
      </div>
      <div className="task-list-container">
        <h1 className="task-list-heading">Tags</h1>
        <ul className="tags-container">
          {tagsList.map(tag => (
            <li key={tag.optionId} className="tags-item">
              <button
                type="button"
                className={`tag-btn ${
                  activeTag === tag.optionId ? 'active-tag' : ''
                }`}
                onClick={() => onTagClick(tag.optionId)}
              >
                {tag.displayText}
              </button>
            </li>
          ))}
        </ul>
        <h1 className="task-list-heading">Tasks</h1>
        {filteredTasks.length > 0 ? (
          <ul className="tasks-container">
            {filteredTasks.map(task => (
              <li key={task.id} className="task-item">
                <p className="task-text">{task.text}</p>
                <p className="task-tag">{task.tag}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-task-add-text"> No Tasks Added Yet</p>
        )}
      </div>
    </div>
  )
}

export default App
