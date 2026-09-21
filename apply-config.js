// =========================================================
// 🔧 هذا الملف بيقرأ من config.js ويعبّي الصفحة تلقائيًا
//    ما تحتاجي تعدلي فيه — التعديل كله بملف config.js فقط
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
  const c = weddingConfig;

  // ---- عنوان التبويب ----
  document.title = c.pageTitle;

  // ---- شاشة الستارة (الأسماء بالدائرة) ----
  const entryNames = document.querySelector(".entry-names");
  if (entryNames) {
    entryNames.innerHTML = `${c.couple.groomName}<br>&<br>${c.couple.brideName}`;
  }

  // ---- الهيدر الرئيسي (Hero) ----
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (heroSubtitle) heroSubtitle.textContent = c.couple.eventType;

  const titlePrefix = document.querySelector(".title-prefix");
  if (titlePrefix) titlePrefix.textContent = `${c.couple.groomPrefix}`;

  const nameTexts = document.querySelectorAll(".hero-names .name-text");
  if (nameTexts[0]) nameTexts[0].textContent = c.couple.groomName;
  if (nameTexts[1]) nameTexts[1].textContent = c.couple.brideName;

  const heroDate = document.querySelector(".hero-date");
  if (heroDate) heroDate.textContent = c.date.heroDateText;

  // ---- قسم الترحيب ----
  const welcomeText = document.querySelector(".welcome-text");
  if (welcomeText) welcomeText.innerHTML = c.welcomeText.replace(/\n/g, "<br>");

  const welcomeNames = document.querySelector(".welcome-names");
  if (welcomeNames) welcomeNames.textContent = `${c.couple.groomTitleWelcome} & ${c.couple.brideTitleWelcome}`;

  // ---- الموقع ----
  const locationName = document.querySelector(".location-name");
  if (locationName) locationName.textContent = c.location.hallName;

  const locationAddress = document.querySelector(".location-address");
  if (locationAddress) locationAddress.textContent = c.location.address;

  // ---- كرت التقويم ----
  const calSpans = document.querySelectorAll(".calendar-header span");
  if (calSpans[0]) calSpans[0].textContent = c.date.dayNameArabic;
  if (calSpans[1]) calSpans[1].textContent = c.date.monthArabic;
  if (calSpans[2]) calSpans[2].textContent = c.date.year;

  const bigDay = document.querySelector(".big-day");
  if (bigDay) bigDay.textContent = c.date.dayNumber;

  const dayName = document.querySelector(".day-name");
  if (dayName) dayName.textContent = c.date.dayNameArabic;

  const calTime = document.querySelector(".calendar-body .time");
  if (calTime) calTime.textContent = c.date.displayTime;

  // ---- تفاصيل الحفل ----
  const detailsList = document.querySelector(".details-list");
  if (detailsList && Array.isArray(c.details)) {
    detailsList.innerHTML = c.details
      .map(
        (d) => `
        <div class="detail-item">
            <span class="bullet"></span>
            <span class="text">${d}</span>
            <span class="info-icon">ⓘ</span>
        </div>`
      )
      .join("");
  }

  // ---- رسالة الختام ----
  const closingPs = document.querySelectorAll(".closing-message p");
  if (closingPs[0]) closingPs[0].innerHTML = `${c.closing.line1}<br>${c.closing.line2}`;
  if (closingPs[1]) closingPs[1].textContent = c.closing.highlight;

  // ---- بيت الشعر ----
  const poemEl = document.querySelector(".poem-overlay p");
  if (poemEl) poemEl.innerHTML = c.poem.replace(/\n/g, "<br>");

  // ---- رسائل التهنئة ----
  const congratsContainer = document.querySelector(".congratulations");
  if (congratsContainer && Array.isArray(c.congratsMessages)) {
    const title = congratsContainer.querySelector(".cong-title");
    congratsContainer.innerHTML = "";
    if (title) congratsContainer.appendChild(title);
    c.congratsMessages.forEach((m) => {
      const div = document.createElement("div");
      div.className = "message-bubble";
      div.textContent = `"${m}"`;
      congratsContainer.appendChild(div);
    });
  }

  // ---- برنامج المناسبة (Timeline) ----
  const timelineEl = document.querySelector(".timeline");
  const trackerDot = document.getElementById("scroll-tracker");
  if (timelineEl && Array.isArray(c.timeline)) {
    timelineEl.innerHTML = "";
    if (trackerDot) timelineEl.appendChild(trackerDot);
    c.timeline.forEach((item, i) => {
      const div = document.createElement("div");
      div.className = "timeline-item" + (i === 0 ? " active" : "");
      div.innerHTML = `
        <div class="dot"></div>
        <div class="content">
            <span class="event-name">${item.name}</span>
            <div class="time-container">
                <span class="event-time">${item.time}</span>
                <span class="event-time">${item.date}</span>
            </div>
        </div>`;
      timelineEl.appendChild(div);
    });
  }

  // ---- الصور ----
  const momentsImg = document.querySelector(".moments-section .story-img");
  if (momentsImg) momentsImg.src = c.images.momentsPhoto;

  const storyImg = document.querySelector(".story-section .story-img");
  if (storyImg) storyImg.src = c.images.storyPhoto;

  const qrImg = document.querySelector(".qr-image");
  if (qrImg) qrImg.src = c.images.qrCode;

  // ---- الهدية (التحويل البنكي) ----
  const giftModal = document.getElementById("gift-modal");
  if (giftModal) {
    const ps = giftModal.querySelectorAll(".modal-content > div p");
    if (ps[0]) ps[0].textContent = c.gift.bankName;
    if (ps[1]) ps[1].textContent = c.gift.accountNumber;
  }

  // ---- الفوتر ----
  const footerNames = document.querySelector(".footer-names");
  if (footerNames) footerNames.textContent = `${c.couple.groomName} & ${c.couple.brideName}`;

  const footerDate = document.querySelector(".footer-date");
  if (footerDate) footerDate.textContent = c.date.footerDateShort;

  // ---- نافذة الموقع المنبثقة ----
  const locationModal = document.getElementById("location-modal");
  if (locationModal) {
    const h3 = locationModal.querySelector("h3");
    if (h3) h3.textContent = c.location.hallName;
    const addrP = locationModal.querySelector("p");
    if (addrP) addrP.textContent = c.location.address;
    const mapLink = locationModal.querySelector(".map-link");
    if (mapLink) mapLink.href = `https://maps.google.com/?q=${encodeURIComponent(c.location.googleMapsQuery)}`;
  }

  // ---- الموسيقى ----
  const musicSource = document.querySelector("#bg-music source");
  if (musicSource) {
    musicSource.src = c.music.file;
    document.getElementById("bg-music").load();
  }
});
