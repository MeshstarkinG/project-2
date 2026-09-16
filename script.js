function getBallClass(num) {
  if (num <= 10) return 'ball-yellow';
  if (num <= 20) return 'ball-blue';
  if (num <= 30) return 'ball-red';
  if (num <= 40) return 'ball-grey';
  return 'ball-green';
}

function generateRandom6() {
  const nums = new Set();
  while (nums.size < 6) {
    nums.add(Math.floor(Math.random() * 45) + 1);
  }
  return Array.from(nums).sort((a, b) => a - b);
}

function renderGameRow(containerId, numbers) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = numbers
    .map((number) => `<div class="lotto-ball ${getBallClass(number)}">${number}</div>`)
    .join('');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('visible');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
  }, 1800);
}

function copyGame(numsText) {
  navigator.clipboard?.writeText(numsText)
    .then(() => showToast(`복사완료: ${numsText}`))
    .catch(() => showToast(`복사완료: ${numsText}`));
}

function toggleBookmark(button) {
  const icon = button.querySelector('.material-symbols-outlined');
  if (!icon) return;

  if (icon.textContent === 'bookmark_border') {
    icon.textContent = 'bookmark';
    icon.style.fontVariationSettings = "'FILL' 1";
    button.classList.add('active');
    showToast('저장내역에 보관되었습니다.');
  } else {
    icon.textContent = 'bookmark_border';
    icon.style.fontVariationSettings = "'FILL' 0";
    button.classList.remove('active');
    showToast('저장내역에서 제거되었습니다.');
  }
}

const rows = ['game-row-a', 'game-row-b', 'game-row-c', 'game-row-d', 'game-row-e'];

rows.forEach((rowId) => {
  renderGameRow(rowId, generateRandom6());
});

document.getElementById('generate-btn')?.addEventListener('click', () => {
  rows.forEach((rowId) => {
    renderGameRow(rowId, generateRandom6());
  });
  showToast('새로운 추천 번호 5게임이 생성되었습니다!');
});
