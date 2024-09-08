import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { z } from 'zod';
import RegistrationForm1 from './Form1';
import RegistrationForm2 from './Form2';
function App() {
  const [count, setCount] = useState(0);
  const nameSchema = z.string();
  console.log(nameSchema.safeParse("John"))
  return (
    <>
      <RegistrationForm1 />
      <RegistrationForm2 />
    </>
  )
}

export default App
