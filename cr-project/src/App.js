import './App.css';
import Auth from "./Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import KakaoLogin from './component/kakaoLogin';
import ProfilePath from './component/profilePath';

/*global Kakao*/

const kakaoClientId = '67680321a1cdba702d27c4e7569aab69';
const kakaoRedirectUri = 'http://localhost:3001/login';
const loginUri = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}\
&redirect_uri=${kakaoRedirectUri}&response_type=code`;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <KakaoLogin KAKAO_AUTH_URL={loginUri}/>} />
        <Route path="/login" element={<Auth />} />
        <Route path="/profile" element={<ProfilePath />} />
      </Routes>
    </Router>
  );
}

export default App;