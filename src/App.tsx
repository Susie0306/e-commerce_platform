import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App
