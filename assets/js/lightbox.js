document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("lightbox-modal");
  const modalImg = document.getElementById("lightbox-img");
  const captionText = document.getElementById("lightbox-caption");
  const closeBtn = document.querySelector(".lightbox-close");

  // 1. 블로그 본문 내의 이미지들만 선택 (선택자는 본인의 블로그 테마에 맞게 수정 가능)
  // 예: '.post-content img', 'article img' 등
  const images = document.querySelectorAll(".post-content img, article img, .entry-content img");

  images.forEach(img => {
    // 클릭 가능함을 알리기 위해 마우스 커서 변경
    img.style.cursor = "zoom-in";

    img.addEventListener("click", function() {
      modal.style.display = "block";
      modalImg.src = this.src;
      // 이미지의 alt 속성이 있으면 캡션으로 표시
      captionText.innerHTML = this.alt || "";
      document.body.style.overflow = "hidden"; // 본문 스크롤 방지
    });
  });

  // 닫기 버튼 클릭 시 모달 닫기
  closeBtn.addEventListener("click", closeModal);

  // 모달 바깥 배경 클릭 시 모달 닫기
  modal.addEventListener("click", function(e) {
    if (e.target === modal || e.target === captionText) {
      closeModal();
    }
  });

  // ESC 키 누를 때 모달 닫기
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // 본문 스크롤 복원
  }
});
