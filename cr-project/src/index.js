// import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import ReactDOM from 'react-dom/client';
// import reportWebVitals from './reportWebVitals';
import './index.css';



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
document.getElementById("kakao-login-btn").addEventListener("click", function () {
  const kakaoParams = {
    client_id: "e66e5234504f77fe52966a18dc0ebeea",
    redirect_uri: "http://127.0.0.1:8000/api/v1/users/kakao/callback",
    response_type: "code",
  };
  const kParams = new URLSearchParams(kakaoParams).toString();

  // 카카오 로그인 페이지로 리다이렉트
  window.location.href = `https://kauth.kakao.com/oauth/authorize?${kParams}`;
});

export const kakaoLogIn = async (code) => {
  try {
    const response = await axios.post(`http://127.0.0.1:8000/api/v1/users/kakao`, { code });
    return response.status; // 성공 시 상태 코드를 반환
  } catch (error) {
    console.error("Kakao login failed:", error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};


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


/* =================== 카드 종합 순위 ==================== */
document.querySelector('.dropdown-button').addEventListener('click', function() {
  const menu = document.querySelector('.dropdown-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('click', function(event) {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown.contains(event.target)) {
    document.querySelector('.dropdown-menu').style.display = 'none';
  }
});


/* =================== 카드 순위 ==================== */

// 연령대별
document.querySelector('.age-button').addEventListener('click', function() {
  const menu = document.querySelector('.age-dropdown-menu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});

document.querySelectorAll('.age-dropdown-menu li').forEach(item => {
  item.addEventListener('click', function() {
      const selectedAge = item.getAttribute('data-age');
      document.querySelector('.age-button').innerText = `${selectedAge}대`;
      document.querySelector('.age-dropdown-menu').style.display = 'none';
      updateRankings(selectedAge);
  });
});

// Optional: To close the dropdown if the user clicks outside of it
window.addEventListener('click', function(event) {
  const dropdown = document.querySelector('.section');
  if (!dropdown.contains(event.target)) {
      document.querySelector('.age-dropdown-menu').style.display = 'none';
  }
});


const ageRanges = ['10-20', '20-30', '30-40', '40-50'];
let currentIndex = 0; // 초기 인덱스를 0으로 설정 (10-20대)

// 페이지가 로드될 때 초기 순위를 설정합니다.
window.addEventListener('DOMContentLoaded', function() {
    const selectedAge = ageRanges[currentIndex];
    document.querySelector('.age-button').innerText = `${selectedAge}대`;
    updateRankings(selectedAge); // 초기 순위 업데이트 함수 호출
});

// 왼쪽 화살표 버튼 이벤트
document.querySelector('.prev-age').addEventListener('click', function() {
    currentIndex = (currentIndex === 0) ? ageRanges.length - 1 : currentIndex - 1;
    const selectedAge = ageRanges[currentIndex];
    document.querySelector('.age-button').innerText = `${selectedAge}대`;
    updateRankings(selectedAge);
});

// 오른쪽 화살표 버튼 이벤트
document.querySelector('.next-age').addEventListener('click', function() {
    currentIndex = (currentIndex === ageRanges.length - 1) ? 0 : currentIndex + 1;
    const selectedAge = ageRanges[currentIndex];
    document.querySelector('.age-button').innerText = `${selectedAge}대`;
    updateRankings(selectedAge);
});

// 순위 업데이트 함수
function updateRankings(ageRange) {
  const rankingContainer = document.getElementById('age-rankings');
  let rankingsHtml = '';

  if (ageRange === '10-20') {
      rankingsHtml = `
          <div class="card-list">
              <li>
                <div class="rank">1</div>
                <img src="card_data/etc/payco_point.png" alt="PAYCO 포인트 카드">
                <div class="card-name">PAYCO 포인트 카드<br>엔에이치엔페이코</div>
              </li>
              <li>
                <div class="rank">2</div>
                <img src="card_data/kb/nori2.png" alt="노리2 체크카드">
                <div class="card-name">노리2 체크카드<br>KB국민카드</div>
              </li>
              <li>
                <div class="rank">3</div>
                <img src="card_data/shinhan/deepdream.png" alt="신한카드 Deep Dream 체크">
                <div class="card-name">신한카드 Deep Dream 체크<br>신한카드</div>
              </li>
              <li>
                <div class="rank">4</div>
                <img src="card_data/hana/naverpay.png" alt="네이버페이 머니 체크카드">
                <div class="card-name">네이버페이 머니 체크카드<br>하나카드</div>
              </li>
              <li>
                <div class="rank">5</div>
                <img src="card_data/kb/travelus.png" alt="트래블러스 체크카드">
                <div class="card-name">트래블러스 체크카드<br>KB국민카드</div>
              </li>
          </div>`;
  } else if (ageRange === '20-30') {
      rankingsHtml = `
          <div class="card-list">
              <li>
                <div class="rank">1</div>
                <img src="card_data/kb/nori.png" alt="노리체크카드">
                <div class="card-name">노리체크카드<br>KB국민카드</div>
              </li>
              <li>
                <div class="rank">2</div>
                <img src="card_data/kb/tosimi_check.png" alt="토심이 첵첵 체크카드">
                <div class="card-name">토심이 첵첵 체크카드<br>KB국민카드</div>
              </li>
              <li>
                <div class="rank">3</div>
                <img src="card_data/etc/k_one.png" alt="ONE 체크카드">
                <div class="card-name">ONE 체크카드<br>케이뱅크</div>
              </li>
              <li>
                <div class="rank">4</div>
                <img src="card_data/etc/naverpay.png" alt="네이버페이 머니카드">
                <div class="card-name">네이버페이 머니카드<br>네이버페이</div>
              </li>
              <li>
                <div class="rank">5</div>
                <img src="card_data/shinhan/sol_travel.png" alt="신한카드 SOL트래블 체크">
                <div class="card-name">신한카드 SOL트래블 체크<br>신한카드</div>
              </li>
          </div>`;
  } else if (ageRange === '30-40') {
    rankingsHtml = `
        <div class="card-list">
            <li>
                <div class="rank">1</div>
                <img src="card_data/etc/payco_point.png" alt="PAYCO 포인트 카드">
                <div class="card-name">PAYCO 포인트 카드<br>엔에이치엔페이코</div>
              </li>
              <li>
                <div class="rank">2</div>
                <img src="card_data/kb/nori2.png" alt="노리2 체크카드">
                <div class="card-name">노리2 체크카드<br>KB국민카드</div>
              </li>
              <li>
                <div class="rank">3</div>
                <img src="card_data/shinhan/deepdream.png" alt="신한카드 Deep Dream 체크">
                <div class="card-name">신한카드 Deep Dream 체크<br>신한카드</div>
              </li>
              <li>
                <div class="rank">4</div>
                <img src="card_data/hana/naverpay.png" alt="네이버페이 머니 체크카드">
                <div class="card-name">네이버페이 머니 체크카드<br>하나카드</div>
              </li>
              <li>
                <div class="rank">5</div>
                <img src="card_data/kb/travelus.png" alt="트래블러스 체크카드">
                <div class="card-name">트래블러스 체크카드<br>KB국민카드</div>
              </li>
        </div>`;
  } else if (ageRange === '40-50') {
    rankingsHtml = `
        <div class="card-list">
            <li>
              <div class="rank">1</div>
              <img src="card_data/kb/nori.png" alt="노리체크카드">
              <div class="card-name">노리체크카드<br>KB국민카드</div>
            </li>
            <li>
              <div class="rank">2</div>
              <img src="card_data/kb/tosimi_check.png" alt="토심이 첵첵 체크카드">
              <div class="card-name">토심이 첵첵 체크카드<br>KB국민카드</div>
            </li>
            <li>
              <div class="rank">3</div>
              <img src="card_data/etc/k_one.png" alt="ONE 체크카드">
              <div class="card-name">ONE 체크카드<br>케이뱅크</div>
            </li>
            <li>
              <div class="rank">4</div>
              <img src="card_data/etc/naverpay.png" alt="네이버페이 머니카드">
              <div class="card-name">네이버페이 머니카드<br>네이버페이</div>
            </li>
            <li>
              <div class="rank">5</div>
              <img src="card_data/shinhan/sol_travel.png" alt="신한카드 SOL트래블 체크">
              <div class="card-name">신한카드 SOL트래블 체크<br>신한카드</div>
            </li>
        </div>`;
  }

  rankingContainer.innerHTML = rankingsHtml;
}



