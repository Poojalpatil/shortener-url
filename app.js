const form = document.getElementById('shortenForm');
const longUrlInput = document.getElementById('longUrl');
const resultSection = document.getElementById('result');
const shortUrlInput = document.getElementById('shortUrl');
const copyBtn = document.getElementById('copyBtn');
const tooltip = document.getElementById('tooltip');
const errorText = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const longUrl = longUrlInput.value.trim();
  if (!longUrl) return;
  resultSection.classList.add('hidden');
  errorText.classList.add('hidden');

  try {
    const response = await fetch("https://tinyurl.com/api-create.php?url=" + encodeURIComponent(longUrl), {
      method: 'GET'
    });

    if (!response.ok) throw new Error("Failed to connect to the URL shortener API");

    const shortUrl = await response.text();

    if (shortUrl.startsWith("Error")) throw new Error(shortUrl);

    shortUrlInput.value = shortUrl;
    resultSection.classList.remove('hidden');
    longUrlInput.value = '';

  } catch (err) {
    errorText.textContent = `Oops! ${err.message}`;
    errorText.classList.remove('hidden');
  }
});

copyBtn.addEventListener('click', () => {
  shortUrlInput.select();
  document.execCommand('copy');
  tooltip.classList.add('show');
  setTimeout(() => tooltip.classList.remove('show'), 1500);
});
