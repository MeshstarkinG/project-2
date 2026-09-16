const countRange = document.getElementById('countRange');
const countValue = document.getElementById('countValue');
const resultsEl = document.getElementById('results');
const bonusToggle = document.getElementById('bonusToggle');
const patternText = document.getElementById('patternText');
const rangeText = document.getElementById('rangeText');
const luckText = document.getElementById('luckText');

const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');

const numberColors = ['red', 'blue', 'green', 'gold', 'purple'];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createSet = () => {
  const pool = Array.from({ length: 45 }, (_, index) => index + 1);
  const numbers = [];

  while (numbers.length < 6) {
    const index = getRandomInt(0, pool.length - 1);
    const value = pool.splice(index, 1)[0];
    numbers.push(value);
  }

  return numbers.sort((a, b) => a - b);
};

const describePattern = (numbers) => {
  const odd = numbers.filter((n) => n % 2 === 1).length;
  const even = numbers.length - odd;
  const low = numbers.filter((n) => n <= 22).length;
  const high = numbers.length - low;

  if (odd >= 4 && even >= 2) return '균형형';
  if (low >= 4 && high >= 2) return '고저형';
  if (numbers.some((n, i) => i > 0 && n - numbers[i - 1] === 1)) return '연속형';
  if (odd === 6 || even === 6) return '홀/짝 집중형';
  return '랜덤형';
};

const formatRange = (numbers) => {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  return `${min}~${max}`;
};

const buildLuckyText = () => {
  const offset = getRandomInt(5, 29);
  return `+${offset}`;
};

const renderResults = (count) => {
  const sets = Array.from({ length: count }, () => createSet());
  const pattern = describePattern(sets[0] || [1, 2, 3, 4, 5, 6]);

  patternText.textContent = pattern;
  rangeText.textContent = sets.length ? formatRange(sets.flat()) : '1~45';
  luckText.textContent = buildLuckyText();

  resultsEl.innerHTML = sets
    .map((numbers, index) => {
      const bonus = bonusToggle.checked ? getRandomInt(1, 45) : null;
      const displayNumbers = [...numbers];
      const bonusDisplay = bonus !== null ? [bonus] : [];
      const allNumbers = [...displayNumbers, ...bonusDisplay];

      return `
        <article class="result-card">
          <div class="result-header">
            <h2>추천 세트 ${index + 1}</h2>
            <span class="badge">행운</span>
          </div>
          <div class="number-row">
            ${displayNumbers
              .map((number, idx) => `
                <span class="lotto-ball" data-tone="${numberColors[(idx + index) % numberColors.length]}">${number}</span>
              `)
              .join('')}
            ${bonus !== null ? `<span class="lotto-ball" data-tone="gold">${bonus}</span>` : ''}
          </div>
          <div class="meta-row">
            <span>숫자 분포</span>
            <strong>${allNumbers.length}개</strong>
          </div>
        </article>
      `;
    })
    .join('');
};

const updateCountValue = () => {
  countValue.textContent = `${countRange.value}개`;
};

countRange.addEventListener('input', () => {
  updateCountValue();
  renderResults(Number(countRange.value));
});

bonusToggle.addEventListener('change', () => {
  renderResults(Number(countRange.value));
});

generateBtn.addEventListener('click', () => {
  renderResults(Number(countRange.value));
});

resetBtn.addEventListener('click', () => {
  countRange.value = '5';
  updateCountValue();
  renderResults(5);
});

updateCountValue();
renderResults(5);
