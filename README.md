## 4주차 반응형 수정

### 확인할 문제

작은 화면에서 메뉴, 기능 카드, 이메일 폼이 좁여 보였다.

### 수정한 내용

-viewport 메타 태그를 추가했다.
-콘텐츠에서 width와 max-width를 함께 사용했다.
-기능 카드 목록을 반응형 grid로 변경했다.
-768px 이하에섯 메뉴, 카드 폼을 한 열로 구성했다.

### 확인할 화면 너비

1100px / 769px / 768px / 390px

## 5주차 구독하기 버튼에 반응하기

### 사용자가 하는 행동
구독하기 창에서 이메일을 입력하고 버튼을 누른다

### 화면에서 바뀌는 내용
이메일을 입력하면 구독 완료 안내문구와 함께 버튼이 비활성화 됨.
이메일을 입력하지 않으면 버튼은 그대로 유지됨.

### 연결 코드
addEventListener("submit", handleSubscribe)로 구독 폼과 handleSubscribe() 함수를 연결
event.preventDefault()로 구독 시 페이지가 새로고침되는 것을 막았다.
textContent로 안내 문구와 버튼의 글자를 변경
classList.add("is-success")로 구독 완료 메시지의 CSS 스타일을 적용
disabled = true로 구독 완료 후 버튼을 비활성화
이메일이 비어 있는 경우, 함수를 완료하지 않고 멈춘다.

## 6주차 JavaScript 이벤트와 동적 UI를 추가하기
### HTML
id, class, data-target, hidden: 요소 식별 및 콘텐츠 연결·표시 제어
### CSS
선택자(., #), :hover, display: flex, gap: 스타일 및 배치
### JavaScript
querySelector(), querySelectorAll(): 요소 선택
addEventListener(): 이벤트 등록
forEach(): 반복 처리
function: 함수 정의
classList, setAttribute(), hidden: 요소 상태 변경
탭 기능
버튼 클릭 → 탭 초기화 → 선택한 패널 표시

### 테스트 결과 확인
1100px에서는 탭 버튼과 콘텐츠 패널의 정렬 및 배치를 확인
769px에서는 데스크톱 레이아웃이 유지되는지 확인
768px에서는 화면 너비에 따른 탭과 콘텐츠의 배치 변화를 확인
390px에서는 좁은 모바일 화면에서도 탭 버튼과 콘텐츠가 잘리거나 겹치지 않고 정상적으로 표시되는지 확인

## sarajeong interior decor -상담 신청 설정
-사용자: 인테리어에 고민이 있는 사람
-목표: 간단하게 개인 맞춤 상담을 신청할 수 있다.

### 사용자의 흐름
1. 개인 정보 수집에 동의하고 '상담 신청하기' 버튼을 누른다.
2. 
3. 
4. 
5. 

### 인터렉션 시나리오
1. 
2. 
3. 
4. 
5. 