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





/* =================== 카카오 로그인 ==================== */

// 1. 로그인 버튼 클릭 시 카카오 로그인 페이지로 리다이렉트
function handleKakaoLogin() {
  const kakaoParams = {
    client_id: "e66e5234504f77fe52966a18dc0ebeea",
    redirect_uri: "http://127.0.0.1:8000/api/v1/users/kakao/callback",
    response_type: "code",
  };
  const kParams = new URLSearchParams(kakaoParams).toString();

  // 카카오 로그인 페이지로 리다이렉트
  window.location.href = `https://kauth.kakao.com/oauth/authorize?${kParams}`;

  // 로그인 버튼을 즉시 로그아웃 버튼으로 변경
  updateLoginUI(true);
}

// 2. 로그아웃 처리
function handleLogout() {
  // "로그인" 버튼으로 상태 복구
  updateLoginUI(false);
  alert("로그아웃 완료");
  window.location.href = "/";  // 홈 페이지로 리다이렉트
}

// 3. 로그인 UI 업데이트
function updateLoginUI(isLoggedIn) {
  const loginBtn = document.getElementById("kakao-login-btn");

  if (!loginBtn) {
    console.error("로그인 버튼을 찾을 수 없습니다.");
    return;
  }

  if (isLoggedIn) {
    // 로그인된 상태
    loginBtn.textContent = "로그아웃";
    loginBtn.removeEventListener("click", handleKakaoLogin);
    loginBtn.addEventListener("click", handleLogout);
  } else {
    // 비로그인 상태
    loginBtn.textContent = "로그인";
    loginBtn.removeEventListener("click", handleLogout);
    loginBtn.addEventListener("click", handleKakaoLogin);
  }
}

// 초기 로그인 상태 설정
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded: 로그인 상태 초기화");

  // DOM이 완전히 로드된 후, 버튼 이벤트 추가
  const loginBtn = document.getElementById("kakao-login-btn");
  if (!loginBtn) {
    console.error("로그인 버튼을 찾을 수 없습니다.");
    return;
  }

  // 기본 상태: 비로그인 상태로 초기화
  updateLoginUI(false);
});

// 카카오 로그인 버튼에 초기 클릭 이벤트 추가
document.getElementById("kakao-login-btn").addEventListener("click", handleKakaoLogin);





/* =================== 카드 종합 순위 ==================== */
document.querySelector('.dropdown-button').addEventListener('click', function (event) {
  event.stopPropagation(); // 이벤트 버블링 방지
  const menu = document.querySelector('.dropdown-menu');
  const overlay = document.querySelector('.overlay');

  if (menu.style.display === 'block') {
      menu.style.display = 'none';
      overlay.style.display = 'none';
  } else {
      menu.style.display = 'block';
      overlay.style.display = 'block';
  }
});

// 오버레이 및 외부 클릭 이벤트
document.querySelector('.overlay').addEventListener('click', function () {
  document.querySelector('.dropdown-menu').style.display = 'none';
  document.querySelector('.overlay').style.display = 'none';
});

window.addEventListener('click', function (event) {
  const dropdown = document.querySelector('.dropdown');
  const menu = document.querySelector('.dropdown-menu');
  const overlay = document.querySelector('.overlay');

  if (!dropdown.contains(event.target)) {
      menu.style.display = 'none';
      overlay.style.display = 'none';
  }
});






/* =================== 카드 순위 ==================== */
document.addEventListener('DOMContentLoaded', function () {
  // 기본 선택값 설정
  const defaultSelections = {
      age: '10-20',
      benefit: 'shopping',
      company: 'shinhan'
  };

  // 열려 있는 드롭다운을 추적하기 위한 변수
  let openDropdown = null;

  // 초기화 함수
  function initializeDropdown(category) {
      const button = document.querySelector(`.ranking-dropdown-button[data-category="${category}"]`);
      const menu = document.querySelector(`.ranking-dropdown-menu[data-category="${category}"]`);
      const rankingsContainer = document.getElementById(`${category}-rankings`);

      // 기본값으로 버튼 텍스트와 순위 표시
      const defaultValue = defaultSelections[category];
      button.innerText = menu.querySelector(`[data-value="${defaultValue}"]`).innerText;
      updateRankings(category, defaultValue, rankingsContainer);

      // 버튼 클릭 이벤트
      button.addEventListener('click', function (event) {
        event.stopPropagation(); // 이벤트 버블링 방지
        // 다른 드롭다운 닫기
        if (openDropdown && openDropdown !== menu) {
            openDropdown.style.display = 'none';
        }
        // 현재 드롭다운 열기/닫기
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        openDropdown = menu.style.display === 'block' ? menu : null;
      });

      // 메뉴 선택 이벤트
      menu.querySelectorAll('li').forEach(item => {
          item.addEventListener('click', function () {
              const value = item.getAttribute('data-value');
              button.innerText = item.innerText;
              menu.style.display = 'none';
              openDropdown = null; // 닫힌 상태로 초기화
              updateRankings(category, value, rankingsContainer);
          });
      });

      // 화살표 버튼 이벤트
      const prevButton = document.querySelector(`#${category}-section .prev-button`);
      const nextButton = document.querySelector(`#${category}-section .next-button`);
      const values = Object.keys(rankingsData[category]);
      let currentIndex = values.indexOf(defaultValue);

      prevButton.addEventListener('click', function () {
          currentIndex = (currentIndex === 0) ? values.length - 1 : currentIndex - 1;
          const value = values[currentIndex];
          button.innerText = menu.querySelector(`[data-value="${value}"]`).innerText;
          updateRankings(category, value, rankingsContainer);
      });

      nextButton.addEventListener('click', function () {
          currentIndex = (currentIndex === values.length - 1) ? 0 : currentIndex + 1;
          const value = values[currentIndex];
          button.innerText = menu.querySelector(`[data-value="${value}"]`).innerText;
          updateRankings(category, value, rankingsContainer);
      });
  }

  // 순위 업데이트 함수
  function updateRankings(category, value, container) {
      container.innerHTML = rankingsData[category][value];
  }

  // 드롭다운 이외 영역 클릭 시 드롭다운 닫기
  window.addEventListener('click', function () {
    if (openDropdown) {
        openDropdown.style.display = 'none';
        openDropdown = null; // 열려 있는 드롭다운 초기화
    }
  });

  // 초기화: 모든 카테고리 기본값 설정
  ['age', 'benefit', 'company'].forEach(initializeDropdown);
});





const rankingsData = {
  age: {
      '10-20': `<div class="card-list">
              <li>
                <div class="rank">1</div>
                <img src="card_data/hana/jade_prime.png" alt="JADE Prime">
                <div class="card-name">JADE Prime<br>하나카드</div>
              </li>
              <li>
                <div class="rank">2</div>
                <img src="card_data/shinhan/mr.life.png" alt="신한카드 Mr.Life">
                <div class="card-name">신한카드 Mr.Life<br>신한카드</div>
              </li>
              <li>
                <div class="rank">3</div>
                <img src="card_data/shinhan/first.png" alt="신한카드 처음">
                <div class="card-name">신한카드 처음<br>신한카드</div>
              </li>
              <li>
                <div class="rank">4</div>
                <img src="card_data/hana/jade_classic.png" alt="JADE Classic">
                <div class="card-name">JADE Classic<br>하나카드</div>
              </li>
              <li>
                <div class="rank">5</div>
                <img src="card_data/samsung/id_on.png" alt="삼성 iD ON 카드">
                <div class="card-name">삼성 iD ON 카드<br>삼성카드</div>
              </li>
          </div>`,
      '20-30': `<div class="card-list">
              <li>
                <div class="rank">1</div>
                <img src="card_data/shinhan/deepoil.png" alt="신한카드 Deep Oil">
                <div class="card-name">신한카드 Deep Oil<br>신한카드</div>
              </li>
              <li>
                <div class="rank">2</div>
                <img src="card_data/samsung/taptap_o.png" alt="삼성카드 taptap O">
                <div class="card-name">삼성카드 taptap O<br>삼성카드</div>
              </li>
              <li>
                <div class="rank">3</div>
                <img src="card_data/hana/travelog.png" alt="트래블로그 체크카드">
                <div class="card-name">트래블로그 체크카드<br>하나카드</div>
              </li>
              <li>
                <div class="rank">4</div>
                <img src="card_data/shinhan/thebest.png" alt="신한카드 The BEST-F">
                <div class="card-name">신한카드 The BEST-F<br>신한카드</div>
              </li>
              <li>
                <div class="rank">5</div>
                <img src="card_data/hana/jade_classic.png" alt="JADE Classic">
                <div class="card-name">JADE Classic<br>하나카드</div>
              </li>
          </div>`,
      '30-40': `<div class="card-list">
            <li>
                <div class="rank">1</div>
                <img src="card_data/kb/myWESH.png" alt="KB국민 My WE:SH 카드">
                <div class="card-name">KB국민 My WE:SH 카드<br>KB국민카드</div>
              </li>
              <li>
                <div class="rank">2</div>
                <img src="card_data/hana/travelog.png" alt="트래블로그 체크카드">
                <div class="card-name">트래블로그 체크카드<br>하나카드</div>
              </li>
              <li>
                <div class="rank">3</div>
                <img src="card_data/hana/jade_prime.png" alt="JADE Prime">
                <div class="card-name">JADE Prime<br>하나카드</div>
              </li>
              <li>
                <div class="rank">4</div>
                <img src="card_data/shinhan/first.png" alt="신한카드 처음">
                <div class="card-name">신한카드 처음<br>신한카드</div>
              </li>
              <li>
                <div class="rank">5</div>
                <img src="card_data/samsung/id_on.png" alt="삼성 iD ON 카드">
                <div class="card-name">삼성 iD ON 카드<br>삼성카드</div>
              </li>
        </div>`,
      '40-50': `<div class="card-list">
            <li>
              <div class="rank">1</div>
              <img src="card_data/samsung/id_simple.png" alt="삼성 iD SIMPLE 카드">
              <div class="card-name">삼성 iD SIMPLE 카드<br>삼성카드</div>
            </li>
            <li>
              <div class="rank">2</div>
              <img src="card_data/samsung/id_on.png" alt="삼성 iD ON 카드">
              <div class="card-name">삼성 iD ON 카드<br>삼성카드</div>
            </li>
            <li>
              <div class="rank">3</div>
              <img src="card_data/kb/goodday.png" alt="굿데이올림카드">
              <div class="card-name">굿데이올림카드<br>KB국민카드</div>
            </li>
            <li>
              <div class="rank">4</div>
              <img src="card_data/hana/jade_prime.png" alt="JADE Prime">
              <div class="card-name">JADE Prime<br>하나카드</div>
            </li>
            <li>
              <div class="rank">5</div>
              <img src="card_data/shinhan/mr.life.png" alt="신한카드 Mr.Life">
              <div class="card-name">신한카드 Mr.Life<br>신한카드</div>
            </li>
        </div>`,
  },
  benefit: {
      shopping: `<div class="card-list">
              <li>
                <div class="rank">1</div>
                <img src="card_data/hana/jade_classic.png" alt="JADE Clssic">
                <div class="card-name">JADE Clssic<br>하나카드</div>
              </li>
              <li>
                <div class="rank">2</div>
                <img src="card_data/samsung/taptap_o.png" alt="삼성카드 taptap O">
                <div class="card-name">삼성카드 taptap O<br>삼성카드</div>
              </li>
              <li>
                <div class="rank">3</div>
                <img src="card_data/samsung/id_on.png" alt="삼성 iD ON 카드">
                <div class="card-name">삼성 iD ON 카드<br>삼성카드</div>
              </li>
              <li>
                <div class="rank">4</div>
                <img src="card_data/shinhan/thebest.png" alt="신한카드 The BEST-F">
                <div class="card-name">신한카드 The BEST-F<br>신한카드</div>
              </li>
              <li>
                <div class="rank">5</div>
                <img src="card_data/kb/myWESH.png" alt="KB국민 My WE:SH 카드">
                <div class="card-name">KB국민 My WE:SH 카드<br>KB국민카드</div>
              </li>
            </div>`,
      delivery_ez_payment: `<div class="card-list">
            <li>
              <div class="rank">1</div>
              <img src="card_data/hana/jade_prime.png" alt="JADE Prime">
              <div class="card-name">JADE Prime<br>하나카드</div>
            </li>
            <li>
              <div class="rank">2</div>
              <img src="card_data/hana/jade_classic.png" alt="JADE Classic">
              <div class="card-name">JADE Classicbr>하나카드</div>
            </li>
            <li>
              <div class="rank">3</div>
              <img src="card_data/samsung/id_nomad.png" alt="삼성 iD NOMAD 카드">
              <div class="card-name">삼성 iD NOMAD 카드<br>삼성카드</div>
            </li>
            <li>
              <div class="rank">4</div>
              <img src="card_data/kb/goodday.png" alt="굿데이올림카드">
              <div class="card-name">굿데이올림카드<br>KB국민카드</div>
            </li>
            <li>
              <div class="rank">5</div>
              <img src="card_data/kb/myWESH.png" alt="KB국민 My WE:SH 카드">
              <div class="card-name">KB국민 My WE:SH 카드<br>KB국민카드</div>
            </li>
        </div>`,
      lunch_transport: `<div class="card-list">
              <li>
                <div class="rank">1</div>
                <img src="card_data/shinhan/mr.life.png" alt="신한카드 Mr.Life">
                <div class="card-name">신한카드 Mr.Life<br>신한카드</div>
              </li>
              <li>
                <div class="rank">2</div>
                <img src="card_data/shinhan/first.png" alt="신한카드 처음">
                <div class="card-name">신한카드 처음<br>신한카드</div>
              </li>
              <li>
                <div class="rank">3</div>
                <img src="card_data/kb/goodday.png" alt="굿데이올림카드">
                <div class="card-name">굿데이올림카드<br>KB국민카드</div>
              </li>
              <li>
                <div class="rank">4</div>
                <img src="card_data/kb/dadam.png" alt="다담카드">
                <div class="card-name">다담카드<br>KB국민카드</div>
              </li>
              <li>
                <div class="rank">5</div>
                <img src="card_data/kb/myWESH.png" alt="KB국민 My WE:SH 카드">
                <div class="card-name">KB국민 My WE:SH 카드<br>KB국민카드</div>
              </li>
            </div>`,
      telecom_utilities: `<div class="card-list">
            <li>
              <div class="rank">1</div>
              <img src="card_data/samsung/id_simple.png" alt="삼성 iD SIMPLE 카드">
              <div class="card-name">삼성 iD SIMPLE 카드<br>삼성카드</div>
            </li>
            <li>
              <div class="rank">2</div>
              <img src="card_data/samsung/id_on.png" alt="삼성 iD ON 카드">
              <div class="card-name">삼성 iD ON 카드<br>삼성카드</div>
            </li>
            <li>
              <div class="rank">3</div>
              <img src="card_data/hana/wonder_life.png" alt="원더카드 (원더 Life)">
              <div class="card-name">원더카드 (원더 Life)<br>하나카드</div>
            </li>
            <li>
              <div class="rank">4</div>
              <img src="card_data/kb/easyall.png" alt="Easy all 티타늄카드">
              <div class="card-name">Easy all 티타늄카드<br>KB국민카드</div>
            </li>
            <li>
              <div class="rank">5</div>
              <img src="card_data/kb/myWESH.png" alt="KB국민 My WE:SH 카드">
              <div class="card-name">KB국민 My WE:SH 카드<br>KB국민카드</div>
            </li>
        </div>`,
      convenience_cafe: `<div class="card-list">
              <li>
                <div class="rank">1</div>
                <img src="card_data/hana/jade_classic.png" alt="JADE Classic">
                <div class="card-name">JADE Classic<br>하나카드</div>
              </li>
              <li>
                <div class="rank">2</div>
                <img src="card_data/hana/jade_prime.png" alt="JADE Prime">
                <div class="card-name">JADE Prime<br>하나카드</div>
              </li>
              <li>
                <div class="rank">3</div>
                <img src="card_data/samsung/id_global.png" alt="삼성 iD GLOBAL 카드">
                <div class="card-name">삼성 iD GLOBAL 카드<br>삼성카드</div>
              </li>
              <li>
                <div class="rank">4</div>
                <img src="card_data/samsung/id_nomad.png" alt="삼성 iD NOMAD 카드">
                <div class="card-name">삼성 iD NOMAD 카드<br>삼성카드</div>
              </li>
              <li>
                <div class="rank">5</div>
                <img src="card_data/hana/wonder_life.png" alt="원더카드 (원더 Life)">
                <div class="card-name">원더카드 (원더 Life)<br>하나카드</div>
              </li>
            </div>`,
      streaming_subscription: `<div class="card-list">
            <li>
              <div class="rank">1</div>
              <img src="card_data/shinhan/mr.life.png" alt="신한카드 Mr.Life">
              <div class="card-name">신한카드 Mr.Life<br>신한카드</div>
            </li>
            <li>
              <div class="rank">2</div>
              <img src="card_data/samsung/taptap_o.png" alt="삼성카드 taptap O">
              <div class="card-name">삼성카드 taptap O<br>삼성카드</div>
            </li>
            <li>
              <div class="rank">3</div>
              <img src="card_data/kb/dadam.png" alt="다담카드">
              <div class="card-name">다담카드<br>KB국민카드</div>
            </li>
            <li>
              <div class="rank">4</div>
              <img src="card_data/shinhan/first.png" alt="신한카드 처음">
              <div class="card-name">신한카드 처음<br>신한카드</div>
            </li>
            <li>
              <div class="rank">5</div>
              <img src="card_data/shinhan/thebest.png" alt="신한카드 The BEST-F">
              <div class="card-name">신한카드 The BEST-F<br>신한카드</div>
            </li>
        </div>`,
  },
  company: {
      shinhan: `<div class="card-list">
              <li>
                <div class="rank">1</div>
                <img src="card_data/shinhan/deepoil.png" alt="신한카드 Deep Oil">
                <div class="card-name">신한카드 Deep Oil<br>신한카드</div>
              </li>
              <li>
                <div class="rank">2</div>
                <img src="card_data/shinhan/first.png" alt="신한카드 처음">
                <div class="card-name">신한카드 처음<br>신한카드</div>
              </li>
              <li>
                <div class="rank">3</div>
                <img src="card_data/shinhan/mr.life.png" alt="신한카드 Mr.Life">
                <div class="card-name">신한카드 Mr.Life<br>신한카드</div>
              </li>
              <li>
                <div class="rank">4</div>
                <img src="card_data/shinhan/deepdream.png" alt="신한카드 Deep Dream">
                <div class="card-name">신한카드 Deep Dream<br>신한카드</div>
              </li>
              <li>
                <div class="rank">5</div>
                <img src="card_data/shinhan/thebest.png" alt="신한카드 The BEST-F">
                <div class="card-name">신한카드 The BEST-F<br>신한카드</div>
              </li>
            </div>`,
      samsung: `<div class="card-list">
            <li>
              <div class="rank">1</div>
              <img src="card_data/samsung/id_on.png" alt="삼성 iD ON 카드">
              <div class="card-name">삼성 iD ON 카드<br>삼성카드</div>
            </li>
            <li>
              <div class="rank">2</div>
              <img src="card_data/samsung/taptap_o.png" alt="삼성카드 taptap O">
              <div class="card-name">삼성카드 taptap O<br>삼성카드</div>
            </li>
            <li>
              <div class="rank">3</div>
              <img src="card_data/samsung/id_simple.png" alt="삼성 iD SIMPLE 카드">
              <div class="card-name">삼성 iD SIMPLE 카드<br>삼성카드</div>
            </li>
            <li>
              <div class="rank">4</div>
              <img src="card_data/samsung/id_global.png" alt="삼성 iD GLOBAL 카드">
              <div class="card-name">삼성 iD GLOBAL 카드<br>삼성카드</div>
            </li>
            <li>
              <div class="rank">5</div>
              <img src="card_data/samsung/id_nomad.png" alt="삼성 iD NOMAD 카드">
              <div class="card-name">삼성 iD NOMAD 카드<br>삼성카드</div>
            </li>
        </div>`,
      kb: `<div class="card-list">
              <li>
                <div class="rank">1</div>
                <img src="card_data/kb/myWESH.png" alt="KB국민 My WE:SH 카드">
                <div class="card-name">KB국민 My WE:SH 카드<br>KB국민카드</div>
              </li>
              <li>
                <div class="rank">2</div>
                <img src="card_data/kb/goodday.png" alt="굿데이올림카드">
                <div class="card-name">굿데이올림카드<br>KB국민카드</div>
              </li>
              <li>
                <div class="rank">3</div>
                <img src="card_data/kb/dadam.png" alt="다담카드">
                <div class="card-name">다담카드<br>KB국민카드</div>
              </li>
              <li>
                <div class="rank">4</div>
                <img src="card_data/kb/easyall.png" alt="Easy all 티타늄카드">
                <div class="card-name">Easy all 티타늄카드<br>KB국민카드</div>
              </li>
              <li>
                <div class="rank">5</div>
                <img src="card_data/kb/the_easy.png" alt="The Easy 카드">
                <div class="card-name">The Easy 카드<br>KB국민카드</div>
              </li>
            </div>`,
      hana: `<div class="card-list">
            <li>
              <div class="rank">1</div>
              <img src="card_data/hana/jade_prime.png" alt="JADE Prime">
              <div class="card-name">JADE Prime<br>하나카드</div>
            </li>
            <li>
              <div class="rank">2</div>
              <img src="card_data/hana/travelog.png" alt="트래블로그 체크카드">
              <div class="card-name">트래블로그 체크카드<br>하나카드</div>
            </li>
            <li>
              <div class="rank">3</div>
              <img src="card_data/hana/jade_classic.png" alt="JADE Classic">
              <div class="card-name">JADE Classic<br>하나카드</div>
            </li>
            <li>
              <div class="rank">4</div>
              <img src="card_data/hana/club_sk.png" alt="CLUB SK 카드">
              <div class="card-name">CLUB SK 카드<br>하나카드</div>
            </li>
            <li>
              <div class="rank">5</div>
              <img src="card_data/hana/wonder_life.png" alt="원더카드 (원더 Life)">
              <div class="card-name">원더카드 (원더 Life)<br>하나카드</div>
            </li>
        </div>`,
  }
};