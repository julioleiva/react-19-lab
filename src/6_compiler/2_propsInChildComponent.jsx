import { useState, version } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HeavyComponent } from './components/HeavyComponent'

function App() {
  const [count, setCount] = useState(0)

  const onSubmit = () => {};

  const data   = { id: 'bla' };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React {version}</h1>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <div>{count}</div>
      <HeavyComponent onSubmit={onSubmit} data={data}/>
    </>
  )
}

export default App
