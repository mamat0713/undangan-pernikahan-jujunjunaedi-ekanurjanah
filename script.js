/* =====================================================
   NAMA TAMU DARI URL
===================================================== */

const params = new URLSearchParams(
    window.location.search
);

const guest = params.get("to");


if (guest) {

    const guestName =
        document.getElementById("guestName");

    guestName.textContent =
        decodeURIComponent(guest.replace(/\+/g, " "));

}


/* =====================================================
   BUKA UNDANGAN
===================================================== */

const openButton =
    document.getElementById("openInvitation");


openButton.addEventListener("click", function () {

    document.body.classList.add("opened");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    startMusic();

});


/* =====================================================
   MUSIC
===================================================== */

const music =
    document.getElementById("weddingMusic");

const musicButton =
    document.getElementById("musicButton");


let musicPlaying = false;


function startMusic() {

    music.play()
        .then(() => {

            musicPlaying = true;

            musicButton.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        })
        .catch(() => {

            console.log(
                "Browser memblokir autoplay."
            );

        });

}


musicButton.addEventListener("click", function () {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicButton.innerHTML =
            '<i class="fa-solid fa-music"></i>';

    } else {

        music.play();

        musicPlaying = true;

        musicButton.innerHTML =
            '<i class="fa-solid fa-pause"></i>';

    }

});


/* =====================================================
   COUNTDOWN
===================================================== */

const weddingDate =
    new Date(
        "October 04, 2026 08:00:00"
    ).getTime();


function countdown() {

    const now =
        new Date().getTime();


    const distance =
        weddingDate - now;


    if (distance <= 0) {

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60))
            /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60))
            /
            1000
        );


    document.getElementById("days")
        .textContent = days;


    document.getElementById("hours")
        .textContent = hours;


    document.getElementById("minutes")
        .textContent = minutes;


    document.getElementById("seconds")
        .textContent = seconds;

}


countdown();

setInterval(countdown, 1000);


/* =====================================================
   RSVP WHATSAPP
===================================================== */

const rsvpForm =
    document.getElementById("rsvpForm");


rsvpForm.addEventListener(
    "submit",
    function(e) {

        e.preventDefault();


        const name =
            document.getElementById(
                "rsvpName"
            ).value;


        const attendance =
            document.getElementById(
                "attendance"
            ).value;


        const count =
            document.getElementById(
                "guestCount"
            ).value;


        const phone =
            "6283131400614";


        const message =
            `Halo, saya ${name}.%0A` +
            `Konfirmasi: ${attendance}%0A` +
            `Jumlah tamu: ${count}`;


        window.open(
            `https://wa.me/${phone}?text=${message}`,
            "_blank"
        );

    }
);


/* =====================================================
   UCAPAN
===================================================== */

const wishForm =
    document.getElementById("wishForm");


wishForm.addEventListener(
    "submit",
    function(e) {

        e.preventDefault();


        const name =
            document.getElementById(
                "wishName"
            ).value;


        const message =
            document.getElementById(
                "wishMessage"
            ).value;


        const wishList =
            document.getElementById(
                "wishList"
            );


        const newWish =
            document.createElement("div");


        newWish.className =
            "wish";


        newWish.innerHTML = `

            <strong>
                ${name}
            </strong>

            <p>
                ${message}
            </p>

        `;


        wishList.prepend(newWish);


        wishForm.reset();

    }
);


/* =====================================================
   COPY REKENING
===================================================== */

function copyAccount() {

    const account =
        "1234567890";


    navigator.clipboard.writeText(account);


    alert(
        "Nomor rekening berhasil disalin!"
    );

}


// button
/* =====================================================
   BOTTOM NAVIGATION SCROLL & ACTIVE STATE
===================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".bottom-nav a");

    // 1. Smooth scroll saat menu bawah diklik
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            
            if (targetId.startsWith("#")) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 2. Otomatis ubah status menu aktif saat halaman di-scroll
    const sections = document.querySelectorAll("main section, #cover");
    
    window.addEventListener("scroll", function () {
        let scrollPos = window.scrollY + 250; // Offset penyesuaian deteksi

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });
});