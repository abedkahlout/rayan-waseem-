// =========================================
// 1. إعدادات العد التنازلي
// =========================================
const weddingDate = new Date(weddingConfig.date.countdownTarget).getTime();

const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.querySelector(".countdown-boxes");
    
    if (countdownElement) {
        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownElement.innerHTML = "<p>حان وقت الاحتفال!</p>";
        } else {
            document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }
}, 1000);

// =========================================
// 2. تفعيل العناصر التفاعلية بعد تحميل الصفحة
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    
    // --- دوال عامة للنوافذ المنبثقة (Modals) ---
    function openModal(modal) {
        if (!modal) return;
        modal.style.display = "flex";
        setTimeout(() => modal.classList.add("active"), 10);
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove("active");
        setTimeout(() => {
            if (!modal.classList.contains("active")) {
                modal.style.display = "none";
            }
        }, 300);
    }

    // إعداد إغلاق النوافذ عند الضغط خارجها
    window.addEventListener("click", function(e) {
        const modals = [document.getElementById('location-modal'), document.getElementById('gift-modal'), document.getElementById('qr-modal')];
        modals.forEach(modal => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // --- زر الموقع ---
    const btnLocation = document.getElementById('btn-location');
    const locationModal = document.getElementById('location-modal');
    const closeLocationModal = document.getElementById('close-modal');
    
    if (btnLocation) btnLocation.addEventListener('click', (e) => { e.preventDefault(); openModal(locationModal); });
    if (closeLocationModal) closeLocationModal.addEventListener('click', () => closeModal(locationModal));

    // --- زر الهدية ---
    const btnGift = document.getElementById("btn-gift");
    const giftModal = document.getElementById("gift-modal");
    const closeGiftModal = document.getElementById("close-gift-modal");
    
    if (btnGift) btnGift.addEventListener("click", (e) => { e.preventDefault(); openModal(giftModal); });
    if (closeGiftModal) closeGiftModal.addEventListener("click", () => closeModal(giftModal));

    // --- زر الـ QR ---
    const btnQR = document.getElementById("btn-qr");
    const qrModal = document.getElementById("qr-modal");
    const closeQRModal = document.getElementById("close-qr-modal");
    
    if (btnQR) btnQR.addEventListener("click", (e) => { e.preventDefault(); openModal(qrModal); });
    if (closeQRModal) closeQRModal.addEventListener("click", () => closeModal(qrModal));

    // --- زر تأكيد الحضور (القلب) ---
    const btnRsvp = document.getElementById('btn-rsvp');
    const heartIcon = document.getElementById('heart-icon');
    if (btnRsvp) {
        btnRsvp.addEventListener('click', function(e) {
            e.preventDefault();
            heartIcon.classList.toggle('ph-heart');
            heartIcon.classList.toggle('ph-fill');
            heartIcon.classList.toggle('heart-active');
        });
    }
// --- مشغل الموسيقى وتأثير الستارة مع التمرير التلقائي السلس (نسخة مصححة) ---
const curtainContainer = document.getElementById('curtain-container');
const startBtn = document.getElementById('start-invitation');
const bgMusic = document.getElementById('bg-music');
const btnMusic = document.getElementById('btn-music');
const musicIcon = document.getElementById('music-icon');

let isPlaying = false;
document.body.style.overflow = 'hidden'; // منع التمرير يدوياً في البداية

// دالة التحكم في الموسيقى (تشغيل / إيقاف)
function toggleMusic() {
    if (!bgMusic) return;

    if (isPlaying) {
        bgMusic.pause();
        if (musicIcon) {
            musicIcon.classList.remove('ph-pause');
            musicIcon.classList.add('ph-music-notes');
        }
        isPlaying = false; // تحديث الحالة إلى متوقف
    } else {
        bgMusic.play()
            .then(() => {
                // 🔥 هنا نقوم بجعل الموسيقى تبدأ من الثانية 5 فور نجاح التشغيل
                bgMusic.currentTime = 0; 

                if (musicIcon) {
                    musicIcon.classList.remove('ph-music-notes');
                    musicIcon.classList.add('ph-pause');
                }
                isPlaying = true; // تحديث الحالة إلى يعمل فقط عند نجاح التشغيل
            })
            .catch(e => {
                console.log("المتصفح يتطلب تفاعلاً من المستخدم لتشغيل الصوت:", e);
            });
    }
}

function startAutoScroll() {
    let scrollSpeed = 2; 
    let autoScrollAnimation; 

    function scrollStep() {
        window.scrollTo(0, window.scrollY + scrollSpeed);
        
        const currentPosition = Math.ceil(window.innerHeight + window.scrollY);
        const totalHeight = document.documentElement.scrollHeight;

        if (currentPosition >= totalHeight - 5) {
            stopScroll(); 
        } else {
            autoScrollAnimation = requestAnimationFrame(scrollStep);
        }
    }

    const stopScroll = () => {
        if (autoScrollAnimation) cancelAnimationFrame(autoScrollAnimation);
        window.removeEventListener('wheel', stopScroll);
        window.removeEventListener('touchstart', stopScroll); 
        window.removeEventListener('mousedown', stopScroll);
    };

    window.addEventListener('wheel', stopScroll, { passive: true });
    window.addEventListener('touchstart', stopScroll, { passive: true });
    window.addEventListener('mousedown', stopScroll, { passive: true });

    autoScrollAnimation = requestAnimationFrame(scrollStep);
}

// عند الضغط على زر فتح الستارة
if (startBtn) {
    startBtn.addEventListener('click', function() {
        if (curtainContainer) curtainContainer.classList.add('curtain-opened');
        
        // تشغيل الموسيقى فوراً (والتي ستبدأ برمجياً من الثانية 5 بداخل الدالة)
        if (!isPlaying) {
            toggleMusic(); 
        }
        
        setTimeout(() => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = ''; 
            
            if (curtainContainer) curtainContainer.style.display = 'none'; 
            
            // إجبار المتصفح على استيعاب الأبعاد الجديدة (Reflow)
            void document.body.offsetHeight;
            
            // استخدام requestAnimationFrame مزدوج لضمان الجاهزية التامة للمتصفح
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    startAutoScroll(); 
                });
            });
        }, 1200);
    });
}
    // عند الضغط على زر الموسيقى الجانبي المتنقل (للإيقاف والتشغيل المتبادل)
    if (btnMusic) {
        btnMusic.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMusic(); // سيقوم بالإيقاف إذا كانت تعمل، والتشغيل إذا كانت متوقفة
        });
    }
    // --- زر المشاركة ---
    const btnShare = document.getElementById('btn-share');
    const invitationImageUrl = 'invitation-card.jpg'; 

    if (btnShare) {
        btnShare.addEventListener('click', async function(e) {
            e.preventDefault();
            try {
                if (navigator.share) {
                    await navigator.share({
                 title: weddingConfig.share.title,
                     text: weddingConfig.share.text,
                        url: window.location.href
                    });
                } else {
                    const link = document.createElement('a');
                    link.href = invitationImageUrl;
                    link.download = ''; // تم توحيد الاسم هنا للتطابق
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            } catch (error) {
                console.log('تم إلغاء المشاركة أو حدث خطأ:', error);
            }
        });
    }

    // --- تفعيل قسم قصتنا المنسدل ---
    const storyToggle = document.getElementById('story-toggle');
    const storySection = document.querySelector('.story-section');
    if (storyToggle && storySection) {
        storyToggle.addEventListener('click', function() {
            storySection.classList.toggle('open');
        });
    }
});


// =========================================
// تأثير النقطة المتحركة مع التمرير (التنقل بين النقاط فقط)
// نسخة محسّنة: مستمع سكرول واحد فقط، مُقيَّد بـ requestAnimationFrame
// لتفادي إعادة الحساب في كل بكسل من التمرير وتفادي أي تعارض مع مستمع آخر.
// =========================================
document.addEventListener("DOMContentLoaded", function() {
    const timeline = document.querySelector('.timeline');
    const trackerDot = document.getElementById('scroll-tracker');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timeline && trackerDot && timelineItems.length > 0) {
        // إظهار النقطة المتحركة
        trackerDot.style.display = 'block';

        let ticking = false;

        function updateTrackerDot() {
            // حساب منتصف الشاشة
            const viewportMiddle = window.innerHeight / 2;

            let closestItem = null;
            let minDistance = Infinity;

            // البحث عن أقرب نقطة حدث إلى منتصف الشاشة
            timelineItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.top + (rect.height / 2);
                const distance = Math.abs(viewportMiddle - itemCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestItem = item;
                }
            });

            // إذا وجدنا الحدث الأقرب، نجعل النقطة تقفز إليه
            if (closestItem) {
                const targetDot = closestItem.querySelector('.dot');
                if (targetDot) {
                    const topPosition = closestItem.offsetTop + targetDot.offsetTop;
                    trackerDot.style.top = topPosition + 'px';

                    timelineItems.forEach(i => i.classList.remove('active'));
                    closestItem.classList.add('active');
                }
            }

            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateTrackerDot);
                ticking = true;
            }
        }, { passive: true });
    }
});


// =========================================
// سلايدر الصور المتحركة (خلفية القسم)
// =========================================
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.video-placeholder').forEach(function (container) {
        const slides = container.querySelectorAll('.slide-img');
        if (slides.length <= 1) return; // لا داعي للتبديل إذا كانت صورة واحدة فقط

        let currentIndex = 0;

        setInterval(function () {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 3000); // 3 ثواني
    });
});


/* =========================================================
   ✨ FADE IN ON SCROLL (يشمل الآن fade-in العادي ومجموعات
   النصوص المتدرجة stagger-group معًا بمراقب واحد فقط)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const fadeElements = document.querySelectorAll(
        ".fade-in, .fade-in-top, .fade-in-right, .fade-in-left, .stagger-group, .text-reveal"
    );

    const observer = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    // إيقاف المراقبة بعد الظهور
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.40,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    fadeElements.forEach((element) => {
        observer.observe(element);
    });

});