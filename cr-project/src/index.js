import React from 'react';
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