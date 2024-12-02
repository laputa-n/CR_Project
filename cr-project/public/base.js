document.addEventListener('DOMContentLoaded', () => {
    // 드롭다운 및 메뉴 기능 설정
    const navMypage = document.getElementById('nav-mypage');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    
    navMypage.querySelector('.mypage__btn').addEventListener('click', () => {
        navMypage.querySelector('.mypage__list').classList.toggle('show');
    });

    navMenu.querySelector('.menu__btn').addEventListener('click', () => {
        navMenu.querySelector('.menu__list').classList.toggle('show');
    });

    navClose.addEventListener('click', () => {
        navMypage.querySelector('.mypage__list').classList.remove('show');
        navMenu.querySelector('.menu__list').classList.remove('show');
    });

    // 카카오 로그인 설정
    document.getElementById("kakao-login-btn").addEventListener("click", function () {
        const kakaoParams = {
            client_id: "e66e5234504f77fe52966a18dc0ebeea",
            redirect_uri: "http://127.0.0.1:8000/api/v1/users/kakao/callback",
            response_type: "code",
        };
        const kParams = new URLSearchParams(kakaoParams).toString();
        window.location.href = `https://kauth.kakao.com/oauth/authorize?${kParams}`;
    });
});
