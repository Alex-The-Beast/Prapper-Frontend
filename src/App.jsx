import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/Homepage"
import Login from "@/components/Login"
import Dashboard from "@/pages/Dashboard"
import ProtectedRoute from "@/components/ProtectedRoute"
import Profile from "@/components/Profile"

const App = () => {
  return (
  <Router>
    <Routes>
      <Route path='/' element={ <HomePage/>}/>
      <Route path='/login' element={<Login/>} />
     

       <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
  
    </Routes>
  </Router>
  )
}

export default App   