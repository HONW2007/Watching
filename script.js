let isPowerOn = false;
let currentVideoIndex = 0;

const tvScreen = document.getElementById('tvScreen');
const screenContent = document.getElementById('screenContent');
const tvVideo = document.getElementById('tvVideo');
const videoSource = document.getElementById('videoSource');
const powerLed = document.getElementById('powerLed');

// Danh sách 7 video (thay bằng đường dẫn thật của bạn)
const videos = [
    "video/sieunhan.mp4",
    "video/chou.mp4",
    "video/jack.mp4",
    "video/jack2.mp4",
    "video/jack3.mp4",
    "video/vdom.mp4",
    "video/nhac.mp4"
];

function togglePower() {
    isPowerOn = !isPowerOn;
    powerLed.classList.toggle('on', isPowerOn);
    if (isPowerOn) {
        screenContent.style.opacity = 0;
        tvVideo.style.display = "block";
        loadAndPlayVideo(videos[currentVideoIndex]);
    } else {
        updateScreen("TV Đang Tắt");
        tvVideo.style.display = "none";
        tvVideo.pause();
        screenContent.style.opacity = 1;
        tvScreen.style.backgroundColor = "#000";
    }
}

function loadAndPlayVideo(src) {
    videoSource.src = src;
    tvVideo.load();
    tvVideo.oncanplay = () => {
        tvVideo.play().catch(err => {
            console.log("Lỗi phát video:", err);
        });
    };
}

function togglePlayPause() {
    if (isPowerOn) {
        if (tvVideo.paused) {
            tvVideo.play().catch(err => console.log("Lỗi phát video:", err));
        } else {
            tvVideo.pause();
        }
    }
}

function nextVideo() {
    if (isPowerOn) {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        loadAndPlayVideo(videos[currentVideoIndex]);
    }
}

function prevVideo() {
    if (isPowerOn) {
        currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
        loadAndPlayVideo(videos[currentVideoIndex]);
    }
}

function updateScreen(text) {
    screenContent.textContent = text;
}

// Thêm sự kiện để lặp lại video hiện tại khi kết thúc
tvVideo.addEventListener('ended', () => {
    if (isPowerOn && !tvVideo.paused) {
        // Lặp lại video hiện tại (giữ nguyên currentVideoIndex)
        tvVideo.play().catch(err => {
            console.log("Lỗi phát lại video:", err);
        });
    }
});