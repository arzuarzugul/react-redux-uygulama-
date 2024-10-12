import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Product from './pages/Product'
import Header from './componant/Header'



const App = () => {
  return (
    <div className=''>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Product/>}/>
        </Routes>
      </Router>

    </div>
  )
}

export default App

