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
            min-height: 400px; /* 페이지 전환 시 높이 튀는 현상 방지 */
        }

        /* 카드 스타일 */
        .gallery-item {
            background-color: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            text-decoration: none;
            color: inherit;
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
</style>

<h1>나의 추억 갤러리</h1>
    
<div class="gallery-grid" id="galleryGrid"></div>

<div class="pagination-container">
    <button class="page-btn" id="prevBtn" onclick="changePage(-1)">이전</button>
    <span class="page-info" id="pageInfo">1 / 10</span>
    <button class="page-btn" id="nextBtn" onclick="changePage(1)">다음</button>
</div>

<script>
        // 상태 관리 변수
        let currentPage = 1;
        const maxPage = 10; // 파일이 1.json ~ 10.json 까지 있으므로 10 설정

        // 1. 해당 페이지의 JSON 파일을 비동기(fetch)로 로드하는 함수
        async function loadPageData(page) {
            try {
                // 각 JSON 파일이 위치한 경로 지정 (예: ./data/1.json 등)
                // 현재는 HTML과 같은 폴더에 파일이 있다고 가정합니다.
                const response = await fetch(`../pages/${page}.json`);
                
                if (!response.ok) {
                    throw new Error(`파일을 불러오는데 실패했습니다: ${page}.json`);
                }
                
                const data = await response.json();
                renderGallery(data);
                updatePaginationControls();
                
            } catch (error) {
                console.error(error);
                document.getElementById('galleryGrid').innerHTML = 
                    `<p style="grid-column: 1/-1; text-align: center; color: red; padding: 40px 0;">
                        ${page}.json 데이터를 불러오는 중 오류가 발생했습니다.
                     </p>`;
            }
        }

        // 2. 데이터를 화면에 그리드로 뿌려주는 함수
        function renderGallery(data) {
            const grid = document.getElementById('galleryGrid');
            
            if (!data || data.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px 0;">데이터가 없습니다.</p>';
                return;
            }

            const galleryHTML = data.map(item => {
                // 이미지 파일 경로 바인딩 (환경에 맞춰 수정)
                const imagePath = `../assets/images/${item.imgfilename}`; 

                return `
                    <a href="${item.url}" class="gallery-item">
                        <div class="image-container">
                            <img src="${imagePath}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
                        </div>
                        <div class="info-container">
                            <p class="item-title">${item.title}</p>
                            <p class="item-filename">${item.imgfilename}</p>
                        </div>
                    </a>
                `;
            }).join('');

            grid.innerHTML = galleryHTML;
        }

        // 3. 페이지 이동 컨트롤 상태(버튼 활성/비활성 및 텍스트) 업데이트
        function updatePaginationControls() {
            document.getElementById('pageInfo').innerText = `${currentPage} / ${maxPage}`;
            document.getElementById('prevBtn').disabled = (currentPage === 1);
            document.getElementById('nextBtn').disabled = (currentPage === maxPage);
        }

        // 4. [이전], [다음] 버튼 클릭 이벤트 핸들러
        function changePage(direction) {
            const nextPage = currentPage + direction;
            
            if (nextPage >= 1 && nextPage <= maxPage) {
                currentPage = nextPage;
                loadPageData(currentPage);
                // 페이지 전환 시 화면 최상단으로 스크롤 이동 (선택사항)
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // 5. 첫 로드 시 1.json 호출
        document.addEventListener('DOMContentLoaded', () => {
            loadPageData(currentPage);
        });
</script>