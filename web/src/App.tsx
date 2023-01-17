import './styles/global.css'

import { Habit } from './componnents/Habit'

function App() {
  return (
    <div>
      <Habit completed={3} />
      <Habit completed={6} />
      <Habit completed={8} />
    </div>
  )
}

export default App

// Componente: Reaproveitar / isolar
// Propriedade: Uma informação enviada para modificar um componente visual ou comportamental
