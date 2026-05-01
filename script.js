// Các element
const letterClosed = document.getElementById('letterClosed');
const letterOpen = document.getElementById('letterOpen');
const openButton = document.getElementById('openButton');
const closeButton = document.getElementById('closeButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');

// Mặc định nhạc được phép chạy
let musicEnabled = true;

// Hàm mở thư
openButton.addEventListener('click', () => {
    letterClosed.style.display = 'none';
    letterOpen.style.display = 'block';
    
    // Phát nhạc khi mở thư (nếu chưa phát)
    if (backgroundMusic.paused && musicEnabled) {
        backgroundMusic.play().catch(error => {
            console.log('Không thể phát nhạc (có thể do trình duyệt chặn):', error);
        });
    }
});

// Hàm đóng thư
closeButton.addEventListener('click', () => {
    letterOpen.style.display = 'none';
    letterClosed.style.display = 'block';
});

// Điều khiển nhạc
musicToggle.addEventListener('click', () => {
    if (musicEnabled) {
        backgroundMusic.pause();
        musicToggle.textContent = '🔇 Bật nhạc';
        musicEnabled = false;
    } else {
        backgroundMusic.play().catch(error => {
            console.log('Không thể phát nhạc:', error);
        });
        musicToggle.textContent = '🔊 Tắt nhạc';
        musicEnabled = true;
    }
});

// Thử phát nhạc tự động khi trang tải
window.addEventListener('load', () => {
    // Một số trình duyệt chặn autoplay, nên chúng ta thử phát
    if (musicEnabled) {
        backgroundMusic.play().catch(error => {
            console.log('Autoplay bị chặn, nhấp để phát nhạc');
        });
    }
});

// Cho phép nhấp vào bất kỳ chỗ nào để phát nhạc (hỗ trợ Autoplay Policy của trình duyệt)
document.addEventListener('click', () => {
    if (backgroundMusic.paused && musicEnabled) {
        backgroundMusic.play().catch(error => {
            console.log('Không thể phát nhạc:', error);
        });
    }
}, { once: true }); // Chỉ lắng nghe lần đầu tiên
