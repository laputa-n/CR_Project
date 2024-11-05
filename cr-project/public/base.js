/* =================== 메뉴 ==================== */
const navMypage = document.getElementById('nav-mypage'),
      navMenu = document.getElementById('nav-menu'),
      navClose = document.getElementById('nav-close')
       
/* 메뉴 보이기 */
navMenu.addEventListener('click', () => {
  navMypage.classList.add('show-menu')
})

/* 메뉴 감추기 */
navClose.addEventListener('click', () => {
  navMypage.classList.remove('show-menu')
})


/* =================== 드롭다운 토글 ==================== */
function toggleDropdown(dropdownId) {
  document.getElementById(dropdownId).classList.toggle('show');
}

/* 항목 감추기 */
window.onclick = function(event) {
  if (!event.target.matches('.mypage__btn') && !event.target.matches('.menu__btn')) {
    // 모든 드롭다운을 확인 후 닫음
    var dropdowns = document.getElementsByClassName('mypage__list');
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
    var menuDropdowns = document.getElementsByClassName('menu__list');
    for (var j = 0; j < menuDropdowns.length; j++) {
      var openMenuDropdown = menuDropdowns[j];
      if (openMenuDropdown.classList.contains('show')) {
        openMenuDropdown.classList.remove('show');
      }
    }
  }
}

window.toggleDropdown = toggleDropdown;


/* =================== 검색 ==================== */
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-overlay')

/* 검색 보이기 */
searchBtn.addEventListener('click', () =>{
   search.classList.add('show-search')
})

/* 검색 감추기 */
searchClose.addEventListener('click', function(event) {
  if (event.target === this) {
    window.location.href = 'index.html';;
  }
})


/* =================== 로그인 ==================== */
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-overlay')

/* 로그인 보이기 */
loginBtn.addEventListener('click', () => {
  login.classList.add('show-login')
})

/* 로그인 감추기 */
loginClose.addEventListener('click', function(event) {
  if (event.target === this) {
    window.location.href = 'index.html'; // 홈 화면으로 이동하는 URL
  }
})


/* =================== 카카오 로그인 ==================== */


/* global Kakao */

// 카카오 SDK 초기화
Kakao.init('43b4b0d0b84ebc052b5575bb698a13df'); // 카카오 앱의 JavaScript 키로 초기화

    document.getElementById('kakao-login-btn').addEventListener('click', function() {
      Kakao.Auth.login({
        success: function(authObj) {
          Kakao.API.request({
            url: '/v2/user/me',
            success: function(res) {
              console.log(res);
              const id_token = authObj.access_token;
              console.log('Access Token: ' + id_token);

              // 서버로 ID 토큰을 보내서 인증
              fetch('/tokensignin', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idtoken: id_token })
              })
              .then(response => response.text())
              .then(data => {
                console.log(data);
              })
              .catch(error => {
                console.error('Error:', error);
              });
            },
            fail: function(error) {
              console.log(error);
            }
          });
        },
        fail: function(err) {
          console.log(err);
        }
      });
    });


/* =================== 회원가입 ==================== */
function showSignup() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup').classList.remove('hidden');
}

function showLogin() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('signup').classList.add('hidden');
}

window.showSignup = showSignup;
window.showLogin = showLogin;
window.handleSignup = handleSignup;
window.handleLogin = handleLogin;


/* =================== 로그인 및 회원가입 연동 ==================== */
async function handleLogin() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('http://192.168.56.1:8081/api/member/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ memberEmail: email, memberPassword: password })
  });

  if (response.ok) {
      const data = await response.json();
      console.log('로그인 성공:', data);
      // 로그인 성공 시 수행할 작업
  } else {
      console.error('로그인 실패:', response.statusText);
      // 로그인 실패 시 수행할 작업
  }
}

async function handleSignup() {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  const response = await fetch('http://192.168.56.1:8081/api/member/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ memberName: name, memberEmail: email, memberPassword: password })
  });

  if (response.ok) {
      const data = await response.json();
      console.log('회원가입 성공:', data);
      // 회원가입 성공 시 수행할 작업
  } else {
      console.error('회원가입 실패:', response.statusText);
      // 회원가입 실패 시 수행할 작업
  }
}