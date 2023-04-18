import TypingClub from './components/TypingClub'
import './App.css'

function App() {
  return (
    <div className="app">
      <TypingClub questionsList={[['q', 'w', 'q', 'w', 'q', 'q', 'q', 'q']]} />
    </div>
  )
}

export default App
