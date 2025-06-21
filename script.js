// 1. Smooth Scrolling สำหรับลิงก์นำทาง
document.querySelectorAll('nav a').forEach(anchor => {
    const linkText = anchor.textContent.trim();
    let targetElement = null;

    if (linkText === 'ผลงาน') {
        targetElement = document.querySelector('.mt-10.mb-10.bg-white.p-10');
    } else if (linkText === 'การแข่งขัน') {
        // ใช้ selector นี้ เพราะมันคือ div ถัดไปจาก div ผลงาน
        targetElement = document.querySelector('.mt-10.mb-10.bg-white.p-10 + div');
    }

    if (targetElement) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});

// 2. ปุ่ม "Back to Top"
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTopBtn';
backToTopBtn.className = 'fixed bottom-5 right-5 bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none transition-all duration-300 ease-in-out hidden z-50';
backToTopBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
`;
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 3. Dynamic Navbar Background
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-opacity-90', 'shadow-md', 'backdrop-blur-lg','rounded-xl');
    } else {
        navbar.classList.remove('bg-opacity-90', 'shadow-md', 'backdrop-blur-lg','rounded-xl');
    }
});

// --- Animation สำหรับรูปภาพเมื่อ Hover (Scale Up & Shadow) ---

// เลือกรูปภาพทั้งหมดที่อยู่ในส่วน "ผลงาน" และ "การแข่งขัน"
// โดยเลือกจาก div ที่ครอบรูปภาพที่มี shadow-lg อยู่แล้ว
const imageContainers = document.querySelectorAll(
    '.mt-10.mb-10.bg-white.p-10 div > img, ' + // รูปในส่วนผลงาน
    'div:has(h1.text-2xl.font-bold.text-center.text-blue-900) div > img' // รูปในส่วนการแข่งขัน
);

imageContainers.forEach(img => {
    // เข้าถึง parent div ของรูปภาพ เพื่อเพิ่ม effect ให้กับ container
    const parentDiv = img.parentElement;

    // เพิ่ม Tailwind CSS Transition ให้กับ parent div
    parentDiv.classList.add('transition-all', 'duration-300', 'ease-in-out','rounded-xl');

    // เมื่อเอาเมาส์ไปชี้ (mouseenter)
    parentDiv.addEventListener('mouseenter', () => {
        parentDiv.classList.add('scale-105', 'shadow-xl','rounded-xl'); // ขยายและเพิ่มเงา
    });

    // เมื่อเอาเมาส์ออก (mouseleave)
    parentDiv.addEventListener('mouseleave', () => {
        parentDiv.classList.remove('scale-105', 'shadow-xl','rounded-xl'); // กลับสู่สภาพเดิม
    });
});