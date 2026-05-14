---
layout: page
title: 다이어리
permalink: /diary/
---

 <style>        
    /* 캘린더 컨테이너 수정 */
    .calendar-container { 
        width: 80%;            /* 화면 너비의 80% */
        max-width: 800px;      /* 너무 커지는 것을 방지하기 위한 최대 너비 (선택 사항) */
        margin: 0 auto;        /* 가로 중앙 정렬 */
        border: 1px solid var(--border-color); 
        padding: 20px; 
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05); /* 약간의 그림자 추가 */
    }

    .calendar-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 20px; 
    }

    .calendar-grid { 
        display: grid; 
        grid-template-columns: repeat(7, 1fr); 
        gap: 10px;             /* 날짜 간격 넓힘 */
    }

    .day-header { 
        font-weight: bold; 
        text-align: center; 
        font-size: 0.9rem; 
        padding-bottom: 10px; 
        color: #666;
    }

    .day { 
        border: 1px solid #eee; 
        aspect-ratio: 1 / 1;    /* 날짜 칸을 정사각형으로 유지 */
        display: flex; 
        align-items: center; 
        justify-content: center; 
        cursor: pointer; 
        position: relative; 
        font-size: 1rem;
        border-radius: 4px;
    }

    .day:hover { background-color: #f8f9fa; }
    .today { background-color: var(--today-bg); font-weight: bold; color: #007bff; border: 1px solid #007bff; }
    
    /* 일기 표시 영역 수정 */
    .diary-viewer { 
        margin-top: 30px; 
        width: 80%;            /* 일기장도 캘린더와 같은 너비로 설정 */
        max-width: 800px; 
        border-top: 2px solid #333; 
        padding-top: 20px; 
    }

    .has-diary::after { 
        content: ''; 
        position: absolute; 
        bottom: 8px; 
        width: 6px; 
        height: 6px; 
        background: #ff5252; 
        border-radius: 50%; 
    }
</style>

<div class="calendar-container">
    <div class="calendar-header">
        <button id="prevMonth"><</button>
        <h3 id="monthDisplay"></h3>
        <button id="nextMonth">></button>
    </div>
    <div class="calendar-grid" id="calendarGrid">
    </div>
</div>

<div class="diary-viewer" id="diaryViewer">
    <h4>날짜를 클릭하면 일기가 표시됩니다.</h4>
    <div id="diaryContent"></div>
</div>

<script>
    let currentViewDate = new Date(); // 현재 보고 있는 날짜
    let diaryData = {}; // JSON 데이터를 저장할 객체

    // 1. JSON 데이터 불러오기 (diary.json 파일이 같은 경로에 있어야 함)
    async function loadDiaryData() {

        const year = currentViewDate.getFullYear();
        // getMonth()는 0부터 시작하므로 +1 후 2자리 포맷팅
        const month = String(currentViewDate.getMonth() + 1).padStart(2, '0');
    
        // 파일명 생성 예: data/diary_2026_04.json
        const fileName = `diary_${year}_${month}.json`;

        try {
            const response = await fetch(fileName);
            if (!response.ok) throw new Error('파일 없음'); // 해당 월 일기가 없으면 에러 던짐
            diaryData = await response.json();
            renderCalendar(); // 데이터 로드 후 캘린더 그리기
        } catch (error) {
            console.error("데이터 로드 실패:", error);
            renderCalendar(); // 실패해도 캘린더는 그림
        }
    }

    // 2. 캘린더 렌더링 함수
    function renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        const monthDisplay = document.getElementById('monthDisplay');
        
        grid.innerHTML = ''; // 초기화
        
        const year = currentViewDate.getFullYear();
        const month = currentViewDate.getMonth();
        
        monthDisplay.innerText = `${year}년 ${month + 1}월`;

        // 요일 헤더 추가
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        days.forEach(d => {
            const el = document.createElement('div');
            el.className = 'day-header';
            el.innerText = d;
            grid.appendChild(el);
        });

        // 날짜 계산
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // 1일 앞의 빈칸 채우기
        for (let i = 0; i < firstDay; i++) {
            grid.appendChild(document.createElement('div'));
        }

        // 날짜 채우기
        for (let i = 1; i <= lastDate; i++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'day';
            dayEl.innerText = i;

            // YYYY-MM-DD 형식 문자열 생성
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

            // 오늘 날짜 표시
            const today = new Date();
            if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
                dayEl.classList.add('today');
            }

            // 일기 데이터가 있는지 확인
            if (diaryData[dateStr]) {
                dayEl.classList.add('has-diary');
            }

            // 클릭 이벤트
            dayEl.onclick = () => showDiary(dateStr);
            grid.appendChild(dayEl);
        }

        //표시 일기 지우기
        const viewer = document.getElementById('diaryContent');
        viewer.innerHTML = ``;
    }

    // 3. 일기 표시 함수
    function showDiary(date) {
        const viewer = document.getElementById('diaryContent');
        if (diaryData[date]) {
            viewer.innerHTML = `
                <h3>${diaryData[date].title}</h3>
                <p>${diaryData[date].content}</p>
                ${diaryData[date].link ? `
                    <div style="margin-top: 15px; padding: 10px; background: #f8f9fa;">
                        🔗 관련 링크: <a href="${diaryData[date].link}">
                            ${diaryData[date].link}
                        </a>
                    </div>
                ` : ''}
            `;
        } else {
            viewer.innerHTML = `<p>${date}에 작성된 일기가 없습니다.</p>`;
        }
    }

    // 월 이동 버튼 이벤트
    document.getElementById('prevMonth').onclick = () => {
        currentViewDate.setMonth(currentViewDate.getMonth() - 1);
        loadDiaryData();
    };
    document.getElementById('nextMonth').onclick = () => {
        currentViewDate.setMonth(currentViewDate.getMonth() + 1);
        loadDiaryData();
    };

    // 최초 실행
    loadDiaryData();

</script> 

