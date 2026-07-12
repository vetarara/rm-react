import './App.css'

const username = 'Veta'
const usernameIf = 'Test if'
const isLoggedIn = true
const isLoggedInFalse = false

const App = () => {
  let content 

  if (isLoggedIn) {
    content = <p>Hi, {usernameIf}!</p>
  } else {
    content = <button>Log in</button>
  }

  const tasks = [
    'Погладить кота',
    'Сделать кофе',
    'Постигать React и JSX'
  ]

  return (
    <>
      <h1 className="title">Rick and Morty</h1>
      {isLoggedIn && <p>Hi, {username}</p>}
      {/* Первая пара {} говорит о том, что дальше вставим выражение */}
      {/* Вторая пара  - JS-объект со стилями */}
      <p style={{color: 'pink', fontWeight: 700 }}>{isLoggedInFalse ? `Hi, {username}!` : 'Please log in'}</p>
      <br />
      {isLoggedInFalse ? <p>Hi, {username}!</p> : <button>Log in</button>}
      {content}
      <p>{1 + 1}</p>
      <p>{usernameIf.toUpperCase()}</p>
      <hr />
      <p>{new Date().toLocaleDateString()}</p>
      <ul>
        {/* Each child in a list should have a unique "key" prop! */}
        {tasks.map((task) => <li key={task}>{task}</li>)}
      </ul>
      <label htmlFor='email'>Email: </label>
      <input id="email" type="email" required={true} />
    </>
  )
}

export default App
