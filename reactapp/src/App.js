import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/AdminLayout';
import ListPosts from './components/ListPosts';
import Login from './components/Login';
import Posts from './components/Posts';

function PrivateOutlet() {
  const auth = true;
  return auth ? <AdminLayout /> : <Navigate to="/" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin" element={<PrivateOutlet />}>
        <Route path='posts' element={<ListPosts />} />
        <Route path='posts/detail' element={<Posts/>}/>
        <Route path='posts/:id' element={<Posts/>}/>
      </Route>
    </Routes>
  );
}

export default App;
