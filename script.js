// ===============================
// TENNISPRO FULL REVISED SCRIPT
// ===============================

// ===============================
// DATA
// ===============================

const coaches = [
{
    id: 'coach1',
    name: 'Ricky Hartono',
    experience: '8 Years',
    specialty: 'Beginner & Technique',
    rating: 4.9,
    price: 'Rp 250.000',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
    bio: 'Coach Ricky fokus melatih teknik dasar, footwork, dan consistency untuk pemain pemula.'
},
{
    id: 'coach2',
    name: 'Sari Wijaya',
    experience: '12 Years',
    specialty: 'Advanced & Competition',
    rating: 5.0,
    price: 'Rp 350.000',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Coach Sari berpengalaman melatih atlet turnamen dan strategi pertandingan.'
},
{
    id: 'coach3',
    name: 'Budi Santoso',
    experience: '10 Years',
    specialty: 'Intermediate & Fitness',
    rating: 4.8,
    price: 'Rp 300.000',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Coach Budi fokus pada stamina, rally control, dan latihan fisik tenis.'
}
];

const scheduleData = [
{
    time: '08:00 AM',
    coach: 'Ricky Hartono',
    level: 'Beginner',
    slots: '8/10',
    price: 'Rp 150.000'
},
{
    time: '10:00 AM',
    coach: 'Sari Wijaya',
    level: 'Intermediate',
    slots: '5/10',
    price: 'Rp 175.000'
},
{
    time: '06:00 PM',
    coach: 'Budi Santoso',
    level: 'Advanced',
    slots: '3/10',
    price: 'Rp 200.000'
}
];

const buddies = [
{
    name: 'Dina P.',
    level: 'Intermediate',
    location: 'GOR Senayan',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
},
{
    name: 'Rudi K.',
    level: 'Advanced',
    location: 'GOR Rawamangun',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
}
];

// ===============================
// ELEMENTS
// ===============================

const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const bookingForm = document.getElementById('bookingForm');
const availableSlots = document.getElementById('availableSlots');
const bookBtn = document.getElementById('bookBtn');

// ===============================
// INITIALIZE
// ===============================

document.addEventListener('DOMContentLoaded', () => {

    // Loading Screen
    setTimeout(() => {

        const loading = document.getElementById('loading-screen');

        if (loading) {
            loading.style.opacity = '0';

            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }

    }, 1500);

    // Render Content
    renderSchedule();
    renderCoaches();
    renderBuddies();

    // Navbar Scroll
    window.addEventListener('scroll', () => {

        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255,255,255,0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)';
        } else {
            navbar.style.background = 'rgba(255,255,255,0.95)';
            navbar.style.boxShadow = 'none';
        }

    });

    // Booking Form
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }

    // Default Date
    const bookingDate = document.getElementById('bookingDate');

    if (bookingDate) {
        bookingDate.min = new Date().toISOString().split('T')[0];
    }

    // Weekend Only Booking
    setupWeekendBooking();

    // Theme
    loadTheme();

    // Animations
    setupScrollAnimations();

});

// ===============================
// MOBILE MENU
// ===============================

hamburger.addEventListener('click', () => {

    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');

});

// ===============================
// SCROLL
// ===============================

function scrollToSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }

    navMenu.classList.remove('active');

}

window.scrollToBooking = () => scrollToSection('classes');
window.scrollToCoaches = () => scrollToSection('coaches');

// ===============================
// RENDER SCHEDULE
// ===============================

function renderSchedule() {

    const scheduleGrid = document.getElementById('scheduleGrid');

    if (!scheduleGrid) return;

    scheduleGrid.innerHTML = scheduleData.map(item => `

        <div class="schedule-card">

            <h4>${item.time}</h4>

            <p><strong>Coach:</strong> ${item.coach}</p>

            <p><strong>Level:</strong> ${item.level}</p>

            <p><strong>Slots:</strong> ${item.slots}</p>

            <p class="price">${item.price}</p>

            <button class="btn-primary" onclick="bookClass('${item.time}')">
                Book Now
            </button>

        </div>

    `).join('');

}

// ===============================
// RENDER COACHES
// ===============================

function renderCoaches() {

    const coachesGrid = document.getElementById('coachesGrid');

    if (!coachesGrid) return;

    coachesGrid.innerHTML = coaches.map(coach => `

        <div class="coach-card">

            <div class="coach-avatar">
                <img src="${coach.image}" alt="${coach.name}">
            </div>

            <div class="coach-info">

                <h3 class="coach-name">${coach.name}</h3>

                <div class="coach-specialty">
                    ${coach.specialty}
                </div>

                <div class="coach-rating">

                    <div class="stars">
                        ★★★★★
                    </div>

                    <span>${coach.rating}</span>

                </div>

                <p><strong>Experience:</strong> ${coach.experience}</p>

                <div class="coach-price">
                    ${coach.price}/session
                </div>

                <div class="coach-buttons">

                    <button class="btn-primary" onclick="showCoachProfile('${coach.id}')">
                        Profile
                    </button>

                    <button 
    class="btn-primary"
    style="flex:1;"
    onclick="bookCoach('${coach.name}')"
>

    Book Coach

</button>

                </div>

            </div>

        </div>

    `).join('');

}

// ===============================
// RENDER BUDDIES
// ===============================

function renderBuddies() {

    const buddiesGrid = document.getElementById('buddiesGrid');

    if (!buddiesGrid) return;

    buddiesGrid.innerHTML = buddies.map(buddy => `

        <div class="coach-card">

            <div class="coach-avatar" style="height:200px;">
                <img src="${buddy.image}" alt="${buddy.name}">
            </div>

            <div class="coach-info">

                <h3>${buddy.name}</h3>

                <p><strong>Level:</strong> ${buddy.level}</p>

                <p><strong>Location:</strong> ${buddy.location}</p>

                <div class="coach-rating">
                    <div class="stars">★★★★★</div>
                    <span>${buddy.rating}</span>
                </div>

                <button class="btn-primary btn-full">
                    Send Request
                </button>

            </div>

        </div>

    `).join('');

}

// ===============================
// WEEKEND BOOKING ONLY
// ===============================

function setupWeekendBooking() {

    const bookingDate = document.getElementById('bookingDate');

    if (!bookingDate) return;

    bookingDate.addEventListener('input', function () {

        const selectedDate = new Date(this.value);

        const day = selectedDate.getDay();

        // 0 = Sunday
        // 6 = Saturday

        if (day !== 0 && day !== 6) {

            showNotification(
                'Booking hanya tersedia hari Sabtu & Minggu!',
                'warning'
            );

            this.value = '';

        }

    });

}

// ===============================
// BOOKING
// ===============================

let currentSlots = 8;
let maxSlots = 10;

function updateSlots() {

    if (!availableSlots) return;

    availableSlots.textContent = `${currentSlots}/${maxSlots}`;

    if (currentSlots <= 0) {

        bookBtn.disabled = true;
        bookBtn.textContent = 'Class Full';

    }

}

function handleBooking(e) {

    e.preventDefault();

    if (currentSlots <= 0) {

        showNotification(
            'Class sudah penuh!',
            'warning'
        );

        return;

    }

    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const level = document.getElementById('bookingLevel').value;
    const coach = document.getElementById('bookingCoach').value;
    const location = document.getElementById('bookingLocation').value;

    showBookingModal({
        date,
        time,
        level,
        coach,
        location
    });

    currentSlots--;

    updateSlots();

}

function bookClass(time) {

    showNotification(
        `Booking class ${time}`,
        'success'
    );

}

// ===============================
// BOOKING MODAL
// ===============================

function showBookingModal(data) {

    const modal = document.getElementById('bookingModal');

    const content = document.getElementById('bookingModalContent');

    content.innerHTML = `

        <h2 style="margin-bottom:20px;">
            Booking Confirmation
        </h2>

        <div style="
            background:#f5f5f5;
            padding:20px;
            border-radius:20px;
            margin-bottom:20px;
        ">

            <p><strong>Date:</strong> ${data.date}</p>

            <p><strong>Time:</strong> ${data.time}</p>

            <p><strong>Level:</strong> ${data.level}</p>

            <p><strong>Coach:</strong> ${data.coach}</p>

            <p><strong>Location:</strong> ${data.location}</p>

            <hr style="margin:20px 0;">

            <h3 style="color:green;">
                Total: Rp 150.000
            </h3>

        </div>

        <button class="btn-primary btn-full"
            onclick="processPayment()">
            Continue Payment
        </button>

    `;

    modal.style.display = 'flex';

}

// ===============================
// PAYMENT
// ===============================

function processPayment() {

    showNotification(
        'Payment Successful!',
        'success'
    );

    closeModal('bookingModal');

}

// ===============================
// COACH PROFILE POPUP
// ===============================

function showCoachProfile(coachId) {

    const coach = coaches.find(c => c.id === coachId);

    if (!coach) return;

    const modal = document.getElementById('bookingModal');

    const content = document.getElementById('bookingModalContent');

    content.innerHTML = `

        <div style="text-align:center;">

            <img 
                src="${coach.image}" 
                style="
                    width:120px;
                    height:120px;
                    border-radius:50%;
                    object-fit:cover;
                    margin-bottom:20px;
                "
            >

            <h2>${coach.name}</h2>

            <p style="
                color:green;
                font-weight:600;
                margin:10px 0;
            ">
                ${coach.specialty}
            </p>

            <p><strong>Experience:</strong> ${coach.experience}</p>

            <p><strong>Rating:</strong> ${coach.rating}</p>

            <p style="
                margin-top:20px;
                line-height:1.7;
            ">
                ${coach.bio}
            </p>

            <div style="
                margin-top:25px;
                display:flex;
                gap:10px;
                justify-content:center;
                flex-wrap:wrap;
            ">

                <button class="btn-primary">
                    Book Coach
                </button>

                <button 
                    class="btn-secondary"
                    onclick="closeModal('bookingModal')"
                >
                    Close
                </button>

            </div>

        </div>

    `;

    modal.style.display = 'flex';

}

// ===============================
// MY PROFILE
// ===============================

function showMyProfile() {

    const modal = document.getElementById('bookingModal');

    const content = document.getElementById('bookingModalContent');

    content.innerHTML = `

        <div style="text-align:center;">

            <img 
                src="https://i.pravatar.cc/200"
                style="
                    width:120px;
                    height:120px;
                    border-radius:50%;
                    object-fit:cover;
                    margin-bottom:20px;
                "
            >

            <h2>My Profile</h2>

            <p><strong>Name:</strong> Rifki Hafiz</p>

            <p><strong>Membership:</strong> Premium</p>

            <p><strong>Points:</strong> 1,250</p>

            <p><strong>Upcoming Class:</strong> Saturday 10:00 AM</p>

            <div style="margin-top:20px;">

                <button 
                    class="btn-secondary"
                    onclick="closeModal('bookingModal')"
                >
                    Close
                </button>

            </div>

        </div>

    `;

    modal.style.display = 'flex';

}

// ===============================
// LOGIN / SIGNUP
// ===============================

function showLoginModal() {

    document.getElementById('loginModal').style.display = 'flex';

}

function showSignupModal() {

    document.getElementById('signupModal').style.display = 'flex';

}

function closeModal(modalId) {

    document.getElementById(modalId).style.display = 'none';

}

// ===============================
// CLOSE MODAL OUTSIDE
// ===============================

window.onclick = function(event) {

    const modals = document.querySelectorAll('.modal');

    modals.forEach(modal => {

        if (event.target === modal) {

            modal.style.display = 'none';

        }

    });

};

// ===============================
// NOTIFICATION
// ===============================

function showNotification(message, type = 'success') {

    const notification = document.createElement('div');

    notification.innerHTML = message;

    notification.style.cssText = `
        position:fixed;
        top:90px;
        right:20px;
        background:${type === 'success' ? '#4CAF50' : '#ff9800'};
        color:white;
        padding:15px 25px;
        border-radius:15px;
        z-index:9999;
        font-weight:600;
        box-shadow:0 10px 20px rgba(0,0,0,0.15);
        transform:translateX(400px);
        transition:0.4s;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {

        notification.style.transform = 'translateX(400px)';

        setTimeout(() => {
            notification.remove();
        }, 400);

    }, 3000);

}

// ===============================
// DARK MODE
// ===============================

function toggleDarkMode() {

    if (document.body.dataset.theme === 'dark') {

        document.body.dataset.theme = 'light';

    } else {

        document.body.dataset.theme = 'dark';

    }

    localStorage.setItem(
        'theme',
        document.body.dataset.theme
    );

}

function loadTheme() {

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {

        document.body.dataset.theme = savedTheme;

    }

}

// ===============================
// SCROLL ANIMATION
// ===============================

function setupScrollAnimations() {

    const cards = document.querySelectorAll(
        '.schedule-card, .coach-card, .pricing-card, .dashboard-card'
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

            }

        });

    }, {
        threshold: 0.1
    });

    cards.forEach(card => {

        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = '0.6s';

        observer.observe(card);

    });

}

// ===============================
// AUTO SLOT UPDATE
// ===============================

setInterval(() => {

    if (currentSlots > 0 && Math.random() > 0.7) {

        currentSlots--;

        updateSlots();

    }

}, 30000);

// ===============================
// INIT SLOT
// ===============================

updateSlots();

// =========================================
// BOOKING FUNCTION
// =========================================

function handleBooking(e){

    e.preventDefault();

    const date =
        document.getElementById("bookingDate").value;

    const time =
        document.getElementById("bookingTime").value;

    const level =
        document.getElementById("bookingLevel").value;

    const coach =
        document.getElementById("bookingCoach").value;

    const location =
        document.getElementById("bookingLocation").value;

    if(
        !date ||
        !time ||
        !level ||
        !coach ||
        !location
    ){

        showNotification(
            "Please complete all booking fields!",
            "error"
        );

        return;

    }

    const bookingDate =
        new Date(date).toLocaleDateString(
            "id-ID",
            {
                weekday:"long",
                year:"numeric",
                month:"long",
                day:"numeric"
            }
        );

    // OPEN MODAL
    document.getElementById(
        "bookingModal"
    ).style.display = "flex";

    // PAYMENT CONTENT
    document.getElementById(
        "bookingModalContent"
    ).innerHTML = `

        <h2 class="payment-title">
            Booking Confirmation
        </h2>

        <div class="booking-detail-box">

            <p>
                <strong>Date:</strong>
                ${bookingDate}
            </p>

            <p>
                <strong>Time:</strong>
                ${time}
            </p>

            <p>
                <strong>Level:</strong>
                ${level}
            </p>

            <p>
                <strong>Coach:</strong>
                ${coach}
            </p>

            <p>
                <strong>Location:</strong>
                ${location}
            </p>

            <hr>

            <h3 class="total-price">
                Rp 150.000
            </h3>

        </div>

        <h3 class="choose-payment">
            Choose Payment Method
        </h3>

        <!-- EWALLET -->
        <div class="payment-section">

            <h4>E-Wallet</h4>

            <div class="payment-grid">

                <button 
                    class="payment-btn"
                    onclick="processPayment('QRIS')"
                >

                    <i class="fas fa-qrcode"></i>

                    QRIS

                </button>

                <button 
                    class="payment-btn"
                    onclick="processPayment('GoPay')"
                >

                    <i class="fas fa-wallet"></i>

                    GoPay

                </button>

                <button 
                    class="payment-btn"
                    onclick="processPayment('OVO')"
                >

                    <i class="fas fa-wallet"></i>

                    OVO

                </button>

                <button 
                    class="payment-btn"
                    onclick="processPayment('DANA')"
                >

                    <i class="fas fa-wallet"></i>

                    DANA

                </button>

            </div>

        </div>

        <!-- BANK -->
        <div class="payment-section">

            <h4>Bank Transfer</h4>

            <div class="payment-grid">

                <button 
                    class="payment-btn"
                    onclick="processPayment('BCA')"
                >

                    <i class="fas fa-university"></i>

                    BCA

                </button>

                <button 
                    class="payment-btn"
                    onclick="processPayment('Mandiri')"
                >

                    <i class="fas fa-university"></i>

                    Mandiri

                </button>

                <button 
                    class="payment-btn"
                    onclick="processPayment('BNI')"
                >

                    <i class="fas fa-university"></i>

                    BNI

                </button>

                <button 
                    class="payment-btn"
                    onclick="processPayment('BRI')"
                >

                    <i class="fas fa-university"></i>

                    BRI

                </button>

            </div>

        </div>

    `;

}

// =========================================
// PAYMENT PROCESS
// =========================================

// =======================
// PAYMENT INFO
// =======================

function showPaymentInfo(){

const method =
document.getElementById(
"paymentMethod"
).value;

const box =
document.getElementById(
"paymentInfo"
);

if(method==="QRIS"){

box.innerHTML=`

<div class="pay-card">

<h3>

Scan QRIS

</h3>

<img
src="assets/images/qris.png"
class="qris-img"
>

<p>

Scan untuk melanjutkan pembayaran

</p>

</div>

`;

}

else if(method==="E-Wallet"){

box.innerHTML=`

<div class="pay-card">

<h3>

Nomor E-Wallet

</h3>

<p>

GoPay:
081234567890

</p>

<p>

OVO:
081234567890

</p>

<p>

DANA:
081234567890

</p>

</div>

`;

}

else if(method==="Transfer Bank"){

box.innerHTML=`

<div class="pay-card">

<h3>

Transfer Bank

</h3>

<p>

BCA:
1234567890

</p>

<p>

Mandiri:
9876543210

</p>

<p>

BRI:
1122334455

</p>

</div>

`;

}

else{

box.innerHTML="";

}

}

// =========================================
// COMPLETE PAYMENT
// =========================================

function completePayment(method){

    showNotification(
        "Payment Success via " + method,
        "success"
    );

    userProfile.classes += 1;

    userProfile.points += 50;

    saveProfile();

    setTimeout(() => {

        closeModal("bookingModal");

        bookingForm.reset();

    }, 1500);

}

// =========================================
// EVENT
// =========================================

document
    .getElementById("bookingForm")
    .addEventListener(
        "submit",
        handleBooking
    );

// =========================================
// BOOK COACH FUNCTION
// =========================================

function bookCoach(coachName){

    // BUKA MODAL
    document.getElementById(
        "bookingModal"
    ).style.display = "flex";

    // ISI MODAL
    document.getElementById(
        "bookingModalContent"
    ).innerHTML = `

        <h2 style="
            text-align:center;
            margin-bottom:25px;
        ">
            Book Coach
        </h2>

        <div class="booking-detail-box">

            <h3 style="
                color:#2E7D32;
                margin-bottom:15px;
            ">
                ${coachName}
            </h3>

            <p>
                Private Tennis Coaching Session
            </p>

            <hr style="
                margin:20px 0;
            ">

            <label>
                Choose Date
            </label>

            <input 
                type="date"
                id="coachBookingDate"
                class="coach-input"
            >

            <label>
                Choose Time
            </label>

            <select 
                id="coachBookingTime"
                class="coach-input"
            >

                <option value="">
                    Select Time
                </option>

                <option>
                    08:00 AM
                </option>

                <option>
                    10:00 AM
                </option>

                <option>
                    04:00 PM
                </option>

                <option>
                    06:00 PM
                </option>

            </select>

            <hr style="
                margin:20px 0;
            ">

            <h3 class="total-price">
                Rp 250.000
            </h3>

        </div>

        <button 
            class="btn-primary btn-full"
            onclick="continueCoachPayment('${coachName}')"
        >
            Continue Payment
        </button>

    `;

}

// =========================================
// CONTINUE PAYMENT
// =========================================

function continueCoachPayment(coachName){

    const date =
        document.getElementById(
            "coachBookingDate"
        ).value;

    const time =
        document.getElementById(
            "coachBookingTime"
        ).value;

    if(!date || !time){

        showNotification(
            "Please select date & time!",
            "error"
        );

        return;

    }

    document.getElementById(
        "bookingModalContent"
    ).innerHTML = `

        <h2 class="payment-title">
            Coach Payment
        </h2>

        <div class="booking-detail-box">

            <p>
                <strong>Coach:</strong>
                ${coachName}
            </p>

            <p>
                <strong>Date:</strong>
                ${date}
            </p>

            <p>
                <strong>Time:</strong>
                ${time}
            </p>

            <hr>

            <h3 class="total-price">
                Rp 250.000
            </h3>

        </div>

        <h3 class="choose-payment">
            Choose Payment Method
        </h3>

        <div class="payment-grid">

            <button 
                class="payment-btn"
                onclick="processPayment('QRIS')"
            >

                <i class="fas fa-qrcode"></i>

                QRIS

            </button>

            <button 
                class="payment-btn"
                onclick="processPayment('GoPay')"
            >

                <i class="fas fa-wallet"></i>

                GoPay

            </button>

            <button 
                class="payment-btn"
                onclick="processPayment('OVO')"
            >

                <i class="fas fa-wallet"></i>

                OVO

            </button>

            <button 
                class="payment-btn"
                onclick="processPayment('BCA')"
            >

                <i class="fas fa-university"></i>

                BCA Transfer

            </button>

        </div>

    `;

}

// ======================
// OPEN PROFILE
// ======================

function openProfile(){

document
.getElementById(
"profileModal"
)
.style.display=
"flex";

}

// ======================
// EDIT PROFILE
// ======================

function editProfile(){

const newName=
prompt(
"Input new name"
);

if(newName){

document
.getElementById(
"profileName"
)
.innerText=
newName;

localStorage.setItem(
"profileName",
newName
);

showNotification(
"Profile updated",
"success"
);

}

}

// ======================
// LOAD PROFILE
// ======================

window.addEventListener(
"load",
()=>{

const saved=

localStorage.getItem(
"profileName"
);

if(saved){

document
.getElementById(
"profileName"
)
.innerText=
saved;

}

});

// ======================
// OPEN PROFILE
// ======================

function openProfile(){

const modal =
document.getElementById(
"profileModal"
);

modal.style.display=
"flex";

const cards=
document.querySelectorAll(
".profile-card"
);

cards.forEach((card,index)=>{

card.style.animation=
"none";

setTimeout(()=>{

card.style.animation=
`cardShow .6s forwards`;

},50);

});

}

// ==========================
// PAY & CONFIRM
// ==========================

function payAndConfirm(){

const coach =
document.getElementById(
"bookingCoach"
)
?.value || "-";

const date =
document.getElementById(
"bookingDate"
)
?.value || "-";

const time =
document.getElementById(
"bookingTime"
)
?.value || "-";

const payment =
document.getElementById(
"paymentMethod"
)
?.value;

if(
payment === ""
){

alert(
"Pilih metode pembayaran dulu"
);

return;

}

// DATA BOOKING

const booking = {

coach,
date,
time,
payment,
price:
"Rp150.000"

};

// AMBIL DATA

let bookings =
JSON.parse(
localStorage.getItem(
"myBookings"
)
) || [];

// SIMPAN

bookings.push(
booking
);

localStorage.setItem(
"myBookings",
JSON.stringify(
bookings
)
);

// UPDATE BOOK COUNT

document
.getElementById(
"bookingCount"
)
.innerText =
bookings.length;

// POPUP

alert(
"Pembayaran berhasil ✓"
);

// CLOSE

closeModal(
"bookingModal"
);

// RESET

document
.getElementById(
"bookingForm"
)
.reset();

}


// ==========================
// MY BOOKINGS
// ==========================

function openMyBookings(){

document
.getElementById(
"myBookingModal"
)
.style.display=
"flex";

const container =
document
.getElementById(
"bookingList"
);

const bookings =
JSON.parse(
localStorage.getItem(
"myBookings"
)
) || [];

if(
bookings.length===0
){

container.innerHTML=
`
<p>
Belum ada booking
</p>
`;

return;

}

container.innerHTML=
bookings.map(

(item)=>`

<div class="booking-card">

<h3>

${item.coach}

</h3>

<p>

📅 ${item.date}

</p>

<p>

🕒 ${item.time}

</p>

<p>

💳 ${item.payment}

</p>

<p>

${item.price}

</p>

</div>

`

).join("");

}