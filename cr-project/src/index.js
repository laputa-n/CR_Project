import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* =================== SHOW MENU ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')
       
/* Menu show */
navToggle.addEventListener('click', () => {
  navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () => {
  navMenu.classList.remove('show-menu')
})

/* =================== SEARCH ==================== */
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-overlay')

/* Search show */
searchBtn.addEventListener('click', () =>{
   search.classList.add('show-search')
})

/* Search hidden */
searchClose.addEventListener('click', function(event) {
  if (event.target === this) {
    window.location.href = 'index.html';;
  }
})

/* =================== LOGIN ==================== */
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-overlay')

/* Login show */
loginBtn.addEventListener('click', () => {
  login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', function(event) {
  if (event.target === this) {
    window.location.href = 'index.html'; // 홈 화면으로 이동하는 URL
  }
})

/* =================== LOGIN WITH KAKAO ==================== */
/* global Kakao */

// 카카오 SDK 초기화
Kakao.init('YOUR_KAKAO_JAVASCRIPT_KEY'); // 카카오 앱의 JavaScript 키로 초기화

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

/* =================== SIGNUP ==================== */
function showSignup() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('signup-form').classList.remove('hidden');
}

function showLogin() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('signup-form').classList.add('hidden');
}

window.showSignup = showSignup;
window.showLogin = showLogin;

/* =================== 로그인 및 회원가입 연동 ==================== */
async function handleLogin() {
  const username = document.getElementById('login-id').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('http://localhost:8081/api/users/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
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
  const username = document.getElementById('signup-id').value;
  const password = document.getElementById('signup-password').value;
  const birthdate = document.getElementById('signup-birthdate').value;

  const response = await fetch('http://localhost:8081/api/users/signup', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, username, password, birthdate })
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
