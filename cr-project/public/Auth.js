// import axios from "axios"


// /* =================== 로그인 ==================== */
// const login = document.getElementById('login'),
//       loginBtn = document.getElementById('login-btn'),
//       loginClose = document.getElementById('login-overlay')

// /* 로그인 보이기 */
// loginBtn.addEventListener('click', () => {
//   login.classList.add('show-login')
// })

// /* 로그인 감추기 */
// loginClose.addEventListener('click', function(event) {
//   if (event.target === this) {
//     window.location.href = 'index.html'; // 홈 화면으로 이동하는 URL
//   }
// })


// /* =================== 카카오 로그인 ==================== */
// document.getElementById("kakao-login-btn").addEventListener("click", function () {
//     const kakaoParams = {
//       client_id: "e66e5234504f77fe52966a18dc0ebeea",
//       redirect_uri: "http://127.0.0.1:8000/api/v1/users/kakao/callback",
//       response_type: "code",
//     };
//     const kParams = new URLSearchParams(kakaoParams).toString();
  
//     // 카카오 로그인 페이지로 리다이렉트
//     window.location.href = `https://kauth.kakao.com/oauth/authorize?${kParams}`;
//   });
  
//   export const kakaoLogIn = async (code) => {
//     try {
//       const response = await axios.post(`http://127.0.0.1:8000/api/v1/users/kakao`, { code });
      
//       if (response.status === 200) {
//         window.location.href = '/';  // 홈 화면으로 이동
//       }
//     } catch (error) {
//       console.error("Kakao login failed:", error);
//       alert("카카오 로그인에 실패했습니다.");
//     }
//   };



// /* =================== 회원가입 ==================== */
// function showSignup() {
//   document.getElementById('login-form').classList.add('hidden');
//   document.getElementById('signup').classList.remove('hidden');
// }

// function showLogin() {
//   document.getElementById('login-form').classList.remove('hidden');
//   document.getElementById('signup').classList.add('hidden');
// }

// window.showSignup = showSignup;
// window.showLogin = showLogin;
// window.handleSignup = handleSignup;
// window.handleLogin = handleLogin;


// // 로그인 상태에 따른 UI 업데이트 함수
// function updateLoginButton() {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const menuloginBtn = document.getElementById("menu-login-btn");

//   if (isLoggedIn) {
//     menuloginBtn.textContent = "로그아웃"; // 로그인 상태일 경우 '로그아웃'으로 변경
//     menuloginBtn.onclick = handleLogout; // 로그아웃 기능 연결
//   } else {
//     menuloginBtn.textContent = "로그인"; // 로그아웃 상태일 경우 '로그인'으로 변경
//     menuloginBtn.onclick = () => {
//       document.getElementById('login').classList.add('show-login'); 
//     }; // 로그인 폼 표시
//   }
// }

// // 로그인 성공 시 호출되는 함수
// function handleLoginSuccess() {
//   localStorage.setItem("isLoggedIn", "true"); // 로그인 상태 저장
//   updateLoginButton(); // UI 업데이트
// }

// // 로그아웃 기능
// function handleLogout() {
//   localStorage.removeItem("isLoggedIn"); // 로그인 상태 제거
//   updateLoginButton(); // UI 초기화
//   window.location.href = "/"; // 로그아웃 후 홈 화면으로 이동
// }


// /* =================== 로그인 및 회원가입 연동 ==================== */
// // 회원가입 처리 함수
// async function handleSignup() {
//   const username = document.getElementById('signup-name').value;
//   const email = document.getElementById('signup-email').value;
//   const password = document.getElementById('signup-password').value;

//   try {
//     const response = await fetch('http://192.168.56.1:8081/api/member/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ memberName: username, memberEmail: email, memberPassword: password })
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('회원가입 성공:', data);
//       alert("회원가입이 완료되었습니다. 로그인해주세요.");
//       // 회원가입 성공 시 필요한 추가 작업 수행
//     } else {
//       console.error('회원가입 실패:', response.statusText);
//       alert("회원가입에 실패했습니다. 입력 정보를 확인해주세요.");
//     }
//   } catch (error) {
//     console.error("회원가입 요청 중 오류 발생:", error);
//     alert("서버 연결에 문제가 있습니다. 다시 시도해주세요.");
//   }
// }

// // 로그인 처리 함수
// async function handleLogin() {
//   const email = document.getElementById('login-email').value;
//   const password = document.getElementById('login-password').value;

//   try {
//     const response = await fetch('http://192.168.56.1:8081/api/member/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ memberEmail: email, memberPassword: password })
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('로그인 성공:', data);
//       handleLoginSuccess();
//       document.getElementById('login').classList.remove('show-login'); // 로그인 폼 닫기
//     } else {
//       console.error('로그인 실패:', response.statusText);
//       alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
//     }
//   } catch (error) {
//     console.error("로그인 요청 중 오류 발생:", error);
//     alert("서버 연결에 문제가 있습니다. 다시 시도해주세요.");
//   }
// }

// // 프로필, 분석 리포트 버튼 클릭 시 로그인 여부 확인
// function checkLoginAndNavigate(url) {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   if (isLoggedIn) {
//     window.location.href = url; // 로그인 상태라면 해당 URL로 이동
//   } else {
//     document.getElementById('login').classList.add('show-login'); // 로그인 폼 표시
//   }
// }

// // 페이지 로드 시 이벤트 리스너 설정
// document.addEventListener('DOMContentLoaded', () => {
//   updateLoginButton();
  
//   // 로그인 상태에 따라 프로필 및 리포트 버튼 처리
//   document.getElementById("profile-btn").addEventListener("click", (event) => {
//     checkLoginAndNavigate(event, "profile.html");
//   });
  
//   document.getElementById("report-btn").addEventListener("click", (event) => {
//     checkLoginAndNavigate(event, "report.html");
//   });
// });





// // /* =================== 로그인 ==================== */
// // const login = document.getElementById('login'),
// //       loginBtn = document.getElementById('login-btn'),
// //       loginClose = document.getElementById('login-overlay')

// // /* 로그인 보이기 */
// // loginBtn.addEventListener('click', () => {
// //   login.classList.add('show-login')
// // })

// // /* 로그인 감추기 */
// // loginClose.addEventListener('click', function(event) {
// //   if (event.target === this) {
// //     window.location.href = 'index.html'; // 홈 화면으로 이동하는 URL
// //   }
// // })


// // /* =================== 카카오 로그인 ==================== */
// // document.getElementById("kakao-login-btn").addEventListener("click", function () {
// //     const kakaoParams = {
// //       client_id: "e66e5234504f77fe52966a18dc0ebeea",
// //       redirect_uri: "http://127.0.0.1:8000/api/v1/users/kakao/callback",
// //       response_type: "code",
// //     };
// //     const kParams = new URLSearchParams(kakaoParams).toString();
  
// //     // 카카오 로그인 페이지로 리다이렉트
// //     window.location.href = `https://kauth.kakao.com/oauth/authorize?${kParams}`;
// //   });
  
// //   export const kakaoLogIn = async (code) => {
// //     try {
// //       const response = await axios.post(`http://127.0.0.1:8000/api/v1/users/kakao`, { code });
      
// //       if (response.status === 200) {
// //         window.location.href = '/';  // 홈 화면으로 이동
// //       }
// //     } catch (error) {
// //       console.error("Kakao login failed:", error);
// //       alert("카카오 로그인에 실패했습니다.");
// //     }
// //   };



// // /* =================== 회원가입 ==================== */
// // function showSignup() {
// //   document.getElementById('login-form').classList.add('hidden');
// //   document.getElementById('signup').classList.remove('hidden');
// // }

// // function showLogin() {
// //   document.getElementById('login-form').classList.remove('hidden');
// //   document.getElementById('signup').classList.add('hidden');
// // }

// // window.showSignup = showSignup;
// // window.showLogin = showLogin;
// // window.handleSignup = handleSignup;
// // window.handleLogin = handleLogin;



// // /* =================== 로그인 및 회원가입 연동 ==================== */
// // async function handleLogin() {
// //   const email = document.getElementById('login-email').value;
// //   const password = document.getElementById('login-password').value;

// //   const response = await fetch('http://192.168.56.1:8081/api/member/login', {
// //       method: 'POST',
// //       headers: {
// //           'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify({ memberEmail: email, memberPassword: password })
// //   });

// //   if (response.ok) {
// //       const data = await response.json();
// //       console.log('로그인 성공:', data);
// //       // 로그인 성공 시 수행할 작업
// //   } else {
// //       console.error('로그인 실패:', response.statusText);
// //       // 로그인 실패 시 수행할 작업
// //   }
// // }

// // async function handleSignup() {
// //   const username = document.getElementById('signup-name').value;
// //   const email = document.getElementById('signup-email').value;
// //   const password = document.getElementById('signup-password').value;

// //   const response = await fetch('http://192.168.56.1:8081/api/member/signup', {
// //       method: 'POST',
// //       headers: {
// //           'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify({ memberName: username, memberEmail: email, memberPassword: password })
// //   });

// //   if (response.ok) {
// //       const data = await response.json();
// //       console.log('회원가입 성공:', data);
// //       // 회원가입 성공 시 수행할 작업
// //   } else {
// //       console.error('회원가입 실패:', response.statusText);
// //       // 회원가입 실패 시 수행할 작업
// //   }
// // }