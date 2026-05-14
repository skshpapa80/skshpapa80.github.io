---
layout: page
title: Photo
permalink: /photo/
---

<style>
        body {
            font-family: 'Noto Sans KR', sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
        }

        /* 갤러리 그리드 레이아웃 */
        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
            max-width: 1200px;
            margin: 0 auto 40px auto;
            min-height: 400px;
        }

        /* 카드 스타일 */
        .gallery-item {
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            cursor: pointer; /* 클릭 가능하다는 표시 */
        }

        .gallery-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0,0,0,0.15);
        }

        .image-container {
            width: 100%;
            height: 200px;
            background-color: #e0e0e0;
            position: relative;
            overflow: hidden;
        }

        .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .gallery-item:hover .image-container img {
            transform: scale(1.05);
        }

        .info-container {
            padding: 15px;
        }

        .item-title {
            font-size: 16px;
            font-weight: bold;
            margin: 0 0 8px 0;
            color: #222;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .item-filename {
            font-size: 13px;
            color: #777;
            margin: 0;
        }

        /* 페이지네이션 컨트롤 스타일 */
        .pagination-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 15px;
            margin-top: 20px;
        }

        .page-btn {
            padding: 10px 20px;
            font-size: 14px;
            border: 1px solid #ccc;
            background-color: #fff;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        .page-btn:hover:not(:disabled) {
            background-color: #e0e0e0;
        }

        .page-btn:disabled {
            background-color: #eaeaea;
            color: #aaa;
            cursor: not-allowed;
        }

        .page-info {
            font-size: 16px;
            font-weight: bold;
            color: #333;
        }

        /* ==========================================
           새로 추가된 라이트박스(Lightbox) 스타일
        ========================================== */
        .lightbox-modal {
            display: none; /* 기본 상태는 숨김 */
            position: fixed;
            z-index: 1000; /* 최상단에 배치 */
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.85); /* 어두운 배경 배경 */
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        /* 라이트박스가 열렸을 때 보이기 위한 클래스 */
        .lightbox-modal.active {
            display: flex;
            opacity: 1;
        }

        .lightbox-content {
            max-width: 85%;
            max-height: 80%;
            border-radius: 4px;
            box-shadow: 0 5px 25px rgba(0,0,0,0.5);
            transform: scale(0.95);
            transition: transform 0.3s ease;
            object-fit: contain; /* 이미지 비율 보존 */
        }

        .lightbox-modal.active .lightbox-content {
            transform: scale(1); /* 부드럽게 커지는 효과 */
        }

        /* 닫기 버튼 */
        .lightbox-close {
            position: absolute;
            top: 20px;
            right: 30px;
            color: #fff;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.2s;
            user-select: none;
        }

        .lightbox-close:hover {
            color: #bbb;
        }

        /* 하단 캡션 텍스트 (제목 표시용) */
        .lightbox-caption {
            position: absolute;
            bottom: 30px;
            color: #fff;
            font-size: 18px;
            text-align: center;
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
        }
</style>

<h1>나의 추억 갤러리</h1>
    
<div class="gallery-grid" id="galleryGrid"></div>

<div class="pagination-container">
    <button class="page-btn" id="prevBtn" onclick="changePage(-1)">이전</button>
    <span class="page-info" id="pageInfo">1 / 10</span>
    <button class="page-btn" id="nextBtn" onclick="changePage(1)">다음</button>
</div>

<div id="lightbox" class="lightbox-modal" onclick="closeLightbox()">
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-content" id="lightboxImg" alt="확대 이미지">
    <div class="lightbox-caption" id="lightboxCaption"></div>
</div>

<script>
        let currentPage = 1;
        const maxPage = 10;

        // 1. 해당 페이지의 JSON 파일 로드
        async function loadPageData(page) {
            try {
                const response = await fetch(`./${page}.json`);
                if (!response.ok) throw new Error(`파일 로드 실패: ${page}.json`);
                
                const data = await response.json();
                renderGallery(data);
                updatePaginationControls();
                
            } catch (error) {
                console.error(error);
                document.getElementById('galleryGrid').innerHTML = 
                    `<p style="grid-column: 1/-1; text-align: center; color: red; padding: 40px 0;">데이터를 불러오는 중 오류가 발생했습니다.</p>`;
            }
        }

        // 2. 데이터를 화면에 카드로 렌더링
        function renderGallery(data) {
            const grid = document.getElementById('galleryGrid');
            
            if (!data || data.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px 0;">데이터가 없습니다.</p>';
                return;
            }

            // 라이트박스를 띄울 것이므로 <a> 태그 대신 <div> 태그로 카드 구조 변경
            const galleryHTML = data.map(item => {
                const imagePath = `./images/${item.imgfilename}`; 

                // 큰 이미지로 보기 위해 이미지 경로와 타이틀을 자바스크립트 함수로 전달합니다.
                return `
                    <div class="gallery-item" onclick="openLightbox('${imagePath}', '${item.title}')">
                        <div class="image-container">
                            <img src="${imagePath}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                        </div>
                        <div class="info-container">
                            <p class="item-title">${item.title}</p>
                            <p class="item-filename">${item.imgfilename}</p>
                        </div>
                    </div>
                `;
            }).join('');

            grid.innerHTML = galleryHTML;
        }

        // 3. 페이지네이션 컨트롤 상태 업데이트
        function updatePaginationControls() {
            document.getElementById('pageInfo').innerText = `${currentPage} / ${maxPage}`;
            document.getElementById('prevBtn').disabled = (currentPage === 1);
            document.getElementById('nextBtn').disabled = (currentPage === maxPage);
        }

        // 4. 페이지 이동
        function changePage(direction) {
            const nextPage = currentPage + direction;
            if (nextPage >= 1 && nextPage <= maxPage) {
                currentPage = nextPage;
                loadPageData(currentPage);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // ==========================================
        // 새로 추가된 라이트박스 제어 자바스크립트 함수
        // ==========================================
        function openLightbox(src, title) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            const lightboxCaption = document.getElementById('lightboxCaption');

            lightboxImg.src = src;               // 이미지 경로 매핑
            lightboxCaption.innerText = title;  // 하단 텍스트 매핑

            lightbox.classList.add('active');   // 모달 활성화 및 페이드인 효과
            document.body.style.overflow = 'hidden'; // 라이트박스가 켜진 동안 본문 스크롤 막기
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active'); // 모달 비활성화
            document.body.style.overflow = 'auto';  // 본문 스크롤 다시 복구
        }

        // 첫 로드 시 1.json 호출
        document.addEventListener('DOMContentLoaded', () => {
            loadPageData(currentPage);
        });
</script>
