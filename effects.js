// =========================================
// ✨ تأثير Ripple الذهبي
// =========================================
function initRippleEffect() {
    document.querySelectorAll('button, .nav-item, .save-date-btn').forEach(btn => {
        btn.style.position = 'relative';
        btn.style.overflow = 'hidden';
        
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-gold');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(218, 165, 32, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleGold 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// إضافة keyframes للـ Ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleGold {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);


// =========================================
// 🌸 بتلات ورد عند النهاية
// =========================================
let endPetalsShown = false;

function initEndPetals() {
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / 
            (document.body.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 85 && !endPetalsShown) {
            endPetalsShown = true;
            triggerFallingPetals();
        }
    });
}

function triggerFallingPetals() {
    const container = document.createElement('div');
    container.id = 'end-petals-container';
    container.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 9998;
        overflow: hidden;
    `;
    document.body.appendChild(container);
    
    const colors = ['#ffb7c5', '#ffc0cb', '#ff69b4', '#db7093', '#f4a460'];
    
    for (let i = 0; i < 25; i++) {
        const petal = document.createElement('div');
        const size = Math.random() * 10 + 6;
        const left = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 2 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        petal.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            top: -20px;
            border-radius: 50% 0 50% 50%;
            opacity: 0.7;
            animation: fallPetal ${duration}s ease-in ${delay}s forwards;
        `;
        
        container.appendChild(petal);
    }
    
    // إزالة بعد 4 ثوانٍ
    setTimeout(() => container.remove(), 4000);
}

const petalsStyle = document.createElement('style');
petalsStyle.textContent = `
    @keyframes fallPetal {
        0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0.7;
        }
        100% {
            transform: translateY(100vh) rotate(720deg) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(petalsStyle);


// =========================================
// ⭐ شرارات عند أول لمس
// =========================================
let firstTouchDone = false;

function initFirstTouchSparkle() {
    document.addEventListener('touchstart', handleFirstTouch, { once: true });
    document.addEventListener('click', handleFirstTouch, { once: true });
}

function handleFirstTouch(e) {
    if (firstTouchDone) return;
    firstTouchDone = true;
    
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    
    createTouchSparkles(x, y);
}

function createTouchSparkles(x, y) {
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(container);
    
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / 12;
        const distance = Math.random() * 60 + 20;
        const size = Math.random() * 4 + 2;
        
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, #ffd700, #daa520);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            box-shadow: 0 0 10px #daa520;
            animation: sparkleBurst 0.8s ease-out forwards;
            --angle: ${angle}rad;
            --distance: ${distance}px;
        `;
        
        container.appendChild(sparkle);
    }
    
    setTimeout(() => container.remove(), 800);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleBurst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(cos(var(--angle)) * var(--distance)),
                calc(sin(var(--angle)) * var(--distance))
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);


// =========================================
// 📳 اهتزازات مختلفة
// =========================================
function vibrate(type) {
    if (!navigator.vibrate) return;
    
    switch(type) {
        case 'open':
            navigator.vibrate(50);
            break;
        case 'qr':
            navigator.vibrate([50, 100, 50]);
            break;
        case 'gift':
            navigator.vibrate([100, 50, 100, 50, 100]);
            break;
        case 'light':
            navigator.vibrate(30);
            break;
        case 'strong':
            navigator.vibrate([80, 50, 80]);
            break;
    }
}

// ربط الاهتزازات بالأزرار
function initVibrations() {
    // زر OPEN (الستارة)
    const startBtn = document.getElementById('start-invitation');
    if (startBtn) {
        startBtn.addEventListener('click', () => vibrate('open'));
    }
    
    // زر QR
    const btnQR = document.getElementById('btn-qr');
    if (btnQR) {
        btnQR.addEventListener('click', () => vibrate('qr'));
    }
    
    // زر الهدية
    const btnGift = document.getElementById('btn-gift');
    if (btnGift) {
        btnGift.addEventListener('click', () => vibrate('gift'));
    }
    
    // زر الموقع
    const btnLocation = document.getElementById('btn-location');
    if (btnLocation) {
        btnLocation.addEventListener('click', () => vibrate('light'));
    }
    
    // زر المشاركة
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', () => vibrate('light'));
    }
}


// =========================================
// 👋 رسالة عند المغادرة
// =========================================
let reachedEnd = false;

function initExitMessage() {
    // تتبع الوصول للنهاية
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / 
            (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 80) reachedEnd = true;
    });
    
    // رسالة عند المغادرة
    window.addEventListener('beforeunload', (e) => {
        if (!reachedEnd) {
            e.preventDefault();
            e.returnValue = 'نتمنى أن نراكم في يومنا الجميل 🤍';
        }
    });
    
    // رسالة ناعمة عند تبديل التبويب (للجوال)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && !reachedEnd) {
            document.title = 'نتمنى أن نراكم في يومنا الجميل 🤍';
        } else {
            document.title = weddingConfig.pageTitle || 'دعوة زفاف';
        }
    });
}


// =========================================
// 🚀 تشغيل كل التأثيرات
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    initRippleEffect();
    initEndPetals();
    initFirstTouchSparkle();
    initVibrations();
    initExitMessage();
});

// =========================================
// ✨ بريق عائم إضافي (يُولّد ديناميكياً)
// =========================================
function initDynamicSparkles() {
    const container = document.querySelector('.sparkle-layer') || document.body;
    const count = 14;

    for (let i = 0; i < count; i++) {
        const s = document.createElement('span');
        s.className = 'dynamic-sparkle';
        const size = Math.random() * 6 + 3;
        s.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            top: ${Math.random() * 95}%;
            left: ${Math.random() * 95}%;
            --dur: ${(Math.random() * 3 + 2.5).toFixed(1)}s;
            --delay: ${(Math.random() * 4).toFixed(1)}s;
        `;
        container.appendChild(s);
    }
}


// =========================================
// 💛 قلوب ذهبية وردية متطايرة في الخلفية
// =========================================
function initFloatingHearts() {
    const hearts = ['🤍', '💛', '🌸', '✨'];
    const count = 8;

    for (let i = 0; i < count; i++) {
        const h = document.createElement('span');
        h.className = 'float-heart';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.cssText = `
            left: ${Math.random() * 90 + 5}%;
            font-size: ${(Math.random() * 12 + 12).toFixed(0)}px;
            --dur: ${(Math.random() * 8 + 10).toFixed(1)}s;
            --delay: ${(Math.random() * 12).toFixed(1)}s;
            --sway: ${(Math.random() * 80 - 40).toFixed(0)}px;
            filter: drop-shadow(0 0 6px rgba(198, 161, 91, 0.4));
        `;
        document.body.appendChild(h);
    }
}


// =========================================
// 🔤 إنيميشن حروف الأسماء (حرفاً حرفاً)
// يستخدم MutationObserver ليتعامل مع الأسماء
// التي تُحقن لاحقاً عبر apply-config.js
// =========================================
function splitLetters(el) {
    if (el.dataset.splitDone) return;
    const text = el.textContent.trim();
    if (!text) return;
    el.dataset.splitDone = 'true';
    el.textContent = '';

    // النص العربي: لا يُقسّم حرفياً (يكسر اتصال الحروف ويعكسها)
    // يدخل ككلمة واحدة متصلة بدخول ناعم
    if (/[\u0600-\u06FF]/.test(text)) {
        const s = document.createElement('span');
        s.className = 'hero-letter hero-word';
        s.textContent = text;
        el.appendChild(s);
        return;
    }

    // النص اللاتيني: حرفاً حرفاً
    [...text].forEach((ch, i) => {
        const s = document.createElement('span');
        s.className = 'hero-letter';
        s.textContent = ch === ' ' ? '\u00A0' : ch;
        s.style.animationDelay = `${i * 0.09}s`;
        el.appendChild(s);
    });
}

function initHeroLetterAnimation() {
    const nameEls = document.querySelectorAll('.hero-names .name-text');
    nameEls.forEach(el => {
        splitLetters(el);
        // إذا حُقن النص لاحقاً، قسّمه عندها
        const mo = new MutationObserver(() => {
            if (!el.dataset.splitDone && el.textContent.trim()) {
                splitLetters(el);
                mo.disconnect();
            }
        });
        mo.observe(el, { childList: true, characterData: true, subtree: true });
    });
}


// =========================================
// 🎉 انفجار ذهبي عند فتح الستارة
// =========================================
function initCurtainBurst() {
    const startBtn = document.getElementById('start-invitation');
    if (!startBtn) return;

    startBtn.addEventListener('click', () => {
        const rect = startBtn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        for (let i = 0; i < 24; i++) {
            const p = document.createElement('span');
            p.className = 'curtain-burst-particle';
            const angle = (Math.PI * 2 * i) / 24;
            const dist = Math.random() * 220 + 90;
            const size = Math.random() * 8 + 4;
            p.style.cssText = `
                left: ${cx}px;
                top: ${cy}px;
                width: ${size}px;
                height: ${size}px;
                --bx: ${Math.cos(angle) * dist}px;
                --by: ${Math.sin(angle) * dist}px;
            `;
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 1200);
        }
    });
}


// =========================================
// 🚀 تشغيل التأثيرات الجديدة مع بقية التأثيرات
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    initDynamicSparkles();
    initFloatingHearts();
    initHeroLetterAnimation();
    initCurtainBurst();
});


// =========================================
// 🎬 دخول أسماء العروسين بعد فتح الستارة (Fade In)
// =========================================
function playHeroEntrance() {
    document.body.classList.add('invitation-started');

    // إعادة تشغيل حركة الحروف من جديد
    document.querySelectorAll('.hero-names .name-text').forEach(el => {
        el.querySelectorAll('.hero-letter').forEach(l => {
            l.style.animation = 'none';
            void l.offsetWidth;
            l.style.animation = '';
        });
    });

    // إعادة تشغيل حركات الظهور لعناصر الواجهة
    document.querySelectorAll(
        '.hero .fade-in, .hero .fade-in-top, .hero .fade-in-right, .hero .fade-in-left'
    ).forEach(el => {
        el.classList.remove('show');
        void el.offsetWidth;
        el.classList.add('show');
    });
}

function initHeroEntrance() {
    const startBtn = document.getElementById('start-invitation');
    if (startBtn) {
        startBtn.addEventListener('click', playHeroEntrance);
    }
}


// =========================================
// 🔢 عداد رقم اليوم (من 1 حتى رقم الفرح)
// =========================================
function initDayCounter() {
    const el = document.querySelector('.big-day');
    if (!el) return;

    const target = parseInt(
        (typeof weddingConfig !== 'undefined' && weddingConfig.date && weddingConfig.date.dayNumber) || '25',
        10
    ) || 25;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            io.disconnect();

            const duration = 1800;
            const startTime = performance.now();

            el.classList.add('counted');

            function tick(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // تباطؤ ناعم
                el.textContent = Math.round(1 + (target - 1) * eased);
                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = target;
                }
            }

            requestAnimationFrame(tick);
        });
    }, { threshold: 0.5 });

    io.observe(el);
}


// =========================================
// ⌨️ آلة كاتبة: كتابة اسم اليوم حرفاً حرفاً
// =========================================
function initDayTypewriter() {
    const el = document.querySelector('.day-name');
    if (!el) return;

    // كلمة اليوم من الإعدادات (الجمعة) أو الموجودة في الصفحة
    const word = ((typeof weddingConfig !== 'undefined' && weddingConfig.date && weddingConfig.date.dayNameArabic)
        || el.textContent.trim() || 'الجمعة').trim();

    el.textContent = '';
    el.classList.add('typing');

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            io.disconnect();

            let i = 0;
            const speed = 160;

            function type() {
                if (i <= word.length) {
                    el.textContent = word.slice(0, i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // إخفاء المؤشر بعد اكتمال الكتابة بثانيتين
                    setTimeout(() => el.classList.remove('typing'), 2000);
                }
            }

            // بداية الكتابة بعد اكتمال دخول التقويم
            setTimeout(type, 600);
        });
    }, { threshold: 0.6 });

    io.observe(el);
}


// =========================================
// 📅 دخول التقويم عند الوصول إليه
// =========================================
function initCalendarEntrance() {
    const cal = document.querySelector('.calendar-card');
    if (!cal) return;

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            io.disconnect();
            cal.classList.add('cal-in');
        });
    }, { threshold: 0.4 });

    io.observe(cal);
}


// =========================================
// 🚀 تشغيل الإنيميشنات الجديدة
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    initHeroEntrance();
    initDayCounter();
    initDayTypewriter();
    initCalendarEntrance();
});