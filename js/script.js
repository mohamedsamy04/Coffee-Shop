
var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassive = true;
        }
    }));
} catch (e) {}

var wheelOpt = supportsPassive ? {
    passive: false
} : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}



window.addEventListener("load", function () {
    /* -------------------- Page Loader--------------------- */
    document.querySelector(".pageLoader").classList.add("fade-out");
    disableScroll();
    setTimeout(function () {
        document.querySelector(".pageLoader").style.display = "none";
        enableScroll();
    }, 2000);
});


/* -----------------
Toggle Navbar 
--------------*/
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNav);

function toggleNav() {
    navToggler.classList.toggle("active");
    document.querySelector(".navbar").classList.toggle("active");
}

/* -----------------
Close Nav when clicking on nav item 
--------------*/
document.addEventListener("click", function (e) {
    if (e.target.closest(".navbar a")) {
        toggleNav();
    }
});

/* -----------------
Navbar Sticky 
--------------*/
window.addEventListener("scroll", function () {
    if (this.scrollY > 60) {
        document.querySelector(".header").classList.add("sticky");
    } else {
        document.querySelector(".header").classList.remove("sticky");
    }
});

/* -----------------
Home Section Slider 
--------------*/
document.querySelectorAll(".imgSlider img").forEach(images => {

    images.onclick = () => {
        var src = images.getAttribute('src');
        document.querySelector(".mainHomeImg").src = src;
    };
});

/* -----------------
Initialize Swiper Slider 
--------------*/
var swiper = new Swiper(".reviewSlider", {

    spaceBetween: 20,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true,
    },
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    breakpoints: {
        767: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
    },
    keyboard: {
        enabled: true,
    },
    // effect: "flip",
    loop: true,
    grabCursor: true,
});

/* -----------------
Trigger To Top Button
--------------*/

$(window).scroll(function () {
    if ($(this).scrollTop()) {
        $('#toTop').fadeIn();
    } else {
        $('#toTop').fadeOut();
    }
});

$("#toTop").click(function () {
    //1 second of animation time
    //html works for FFX but not Chrome
    //body works for Chrome but not FFX
    //This strange selector seems to work universally
    $("html, body").animate({
        scrollTop: 0
    }, 40);
});

/* -----------------
Prevent anchor Link Behavior
--------------*/
$("#disabledLink").click(function (ev) {
    ev.preventDefault();
});



document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".hidden");

    function checkVisibility() {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
                el.classList.add("show");
                el.classList.remove("hide");
            } else {
                el.classList.add("hide");
                el.classList.remove("show");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section"); 
    const navLinks = document.querySelectorAll(".navbar a"); 

    function activateNav() {
        let scrollY = window.scrollY;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100; 
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", activateNav);
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // منع إرسال النموذج إذا كانت هناك أخطاء

    let valid = true;

    // التحقق من الحقل Name
    const name = document.getElementById('name');
    if (name.value.trim() === "") {
        name.classList.add('error');
        valid = false;
    } else {
        name.classList.remove('error');
    }

    // التحقق من الحقل Mobile
    const mobile = document.getElementById('mobile');
    const mobilePattern = /^[0-9]{10}$/; // رقم موبايل مكون من 10 أرقام
    if (!mobilePattern.test(mobile.value)) {
        mobile.classList.add('error');
        valid = false;
    } else {
        mobile.classList.remove('error');
    }

    // التحقق من الحقل Number
    const number = document.getElementById('number');
    if (number.value < 1 || number.value > 15 || isNaN(number.value)) {
        number.classList.add('error');
        valid = false;
    } else {
        number.classList.remove('error');
    }

    // التحقق من الحقل Message
    const message = document.getElementById('message');
    if (message.value.trim() === "") {
        message.classList.add('error');
        valid = false;
    } else {
        message.classList.remove('error');
    }

    // إذا كانت كل الفاليديشين صحيحة، إرسال النموذج
    if (valid) {
        this.submit();
    }
});
