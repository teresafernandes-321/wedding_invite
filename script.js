
document.addEventListener("DOMContentLoaded", () => {
  const cover = document.getElementById("cover");
  const invitation = document.getElementById("invitation");
  const openButton = document.getElementById("openButton");
  const music = document.getElementById("weddingMusic");
  const calendar = document.getElementById("calendar");

  // Open the invitation.
  openButton.addEventListener("click", async () => {
    const envelope = document.querySelector(".envelope");

    envelope.classList.add("opening");

    // Allow the envelope flap to begin opening
    await new Promise(resolve => setTimeout(resolve, 650));

    cover.classList.add("hidden");
    invitation.classList.remove("hidden");
    
    music.volume = 0.7;

    try {
        await music.play();
    } catch (error) {
        console.log("Music could not start automatically:", error);
    }

     startAutoScroll();
  });

  // Build the December 2026 calendar.
  function createCalendar(year, monthIndex, weddingDay) {
    if (!calendar) return;

    const weekdays = [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ];

    calendar.replaceChildren();

    // Weekday headings.
    weekdays.forEach((day) => {
      const cell = document.createElement("div");
      cell.className = "calendar-cell calendar-weekday";
      cell.textContent = day;
      calendar.appendChild(cell);
    });

    // Find the weekday on which the month begins.
    const firstDay = new Date(year, monthIndex, 1).getDay();

    // Add empty cells before December 1.
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement("div");
      blank.className = "calendar-cell";
      blank.setAttribute("aria-hidden", "true");
      calendar.appendChild(blank);
    }

    // Find the number of days in December.
    const daysInMonth = new Date(
      year,
      monthIndex + 1,
      0
    ).getDate();

    // Add each date.
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("div");
      cell.className = "calendar-cell calendar-day";
      cell.textContent = day;

      if (day === weddingDay) {
        cell.classList.add("wedding-day");
        cell.setAttribute(
          "aria-label",
          "December 19, 2026 — Wedding Day"
        );
        cell.title = "Blaise & Sheron's Wedding Day";
      }

      calendar.appendChild(cell);
    }
  }

  // December is month index 11 in JavaScript.
  createCalendar(2026, 11, 19);
});

let autoScroll;
let scrollSpeed = 1; // Increase this number for faster scrolling

function startAutoScroll() {
    stopAutoScroll();

    autoScroll = setInterval(() => {
        window.scrollBy(0, scrollSpeed);
    }, 30);
}

function stopAutoScroll() {
    clearInterval(autoScroll);;
}

// Stop scrolling when the user touches or interacts with the page
function stopOnUserInteraction() {
    userStoppedScroll = true;
    stopAutoScroll();
}

window.addEventListener("touchstart", stopOnUserInteraction, {
    passive: true
});

window.addEventListener("wheel", stopOnUserInteraction, {
    passive: true
});

window.addEventListener("pointerdown", stopOnUserInteraction);

window.addEventListener("keydown", stopOnUserInteraction);


function updateWeddingCountdown() {
    // Wedding date: 19 December 2026, 4:00 PM IST
    const weddingDate = new Date("2026-12-19T16:00:00+05:30");
    const now = new Date();
    const difference = weddingDate.getTime() - now.getTime();

    if (difference <= 0) {
        document.getElementById("weddingCountdown").innerHTML =
            "<h3>Today, we celebrate love!</h3>";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );
    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );
    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");
    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateWeddingCountdown();
setInterval(updateWeddingCountdown, 1000);
