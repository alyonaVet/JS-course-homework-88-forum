import './App.css';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/components/Register';
import Login from './features/users/components/Login';
import NotFoundPage from './UI/NotFoundPage/NotFoundPage';
import Posts from './features/posts/components/Posts';
import FullPostPage from './features/posts/FullPostPage';
import AddPostPage from './features/posts/AddPostPage';

const App = () => {
  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/new-post" element={<AddPostPage />} />
          <Route path="/posts/:id" element={<FullPostPage />} />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
