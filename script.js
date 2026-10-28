// Mobile menu: open and close the navigation links
const menuBtn = document.getElementById("menuBtn");
const links = document.getElementById("links");

menuBtn.addEventListener("click", () => {
  const isOpen = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

// Close the menu after tapping a link
links.addEventListener("click", () => links.classList.remove("open"));
// ---------- Helpers ----------
function formatPrice(price) {
  return price === 0 ? "Free" : "KES " + price.toLocaleString("en-KE");
}

function formatDate(event) {
  const day = new Date(event.date).toLocaleDateString("en-GB", {
    weekday: "short", day: "numeric", month: "short", year: "numeric"
  });
  return day + ", " + event.time;
}

// ---------- Build one event card ----------
function cardHTML(event) {
  return `
    <article class="card">
      <div class="poster" style="background: linear-gradient(135deg,
           hsl(${event.hue} 70% 30%), hsl(${event.hue + 50} 80% 50%))">
        ${event.name}
      </div>
      <div class="card-body">
        <span class="tag">${event.category}</span>
        <h3>${event.name}</h3>
        <div class="meta">${formatDate(event)}<br>${event.venue}</div>
        <p>${event.description}</p>
        <div class="card-row">
          <span class="price">${formatPrice(event.price)}</span>
          <a class="btn" href="#event-${event.id}">View details</a>
        </div>
      </div>
    </article>`;
}

// ---------- Show events on the page ----------
function showEvents(list, containerId) {
  document.getElementById(containerId).innerHTML = list.map(cardHTML).join("");
}

showEvents(events.slice(0, 3), "featured");  // first 3 events
// ---------- Search and filter ----------
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("filterCategory");
const typeSelect = document.getElementById("filterType");
const dateSelect = document.getElementById("filterDate");

function applyFilters() {
  const text = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const type = typeSelect.value;
  const dateRule = dateSelect.value;
  const today = new Date();

  const result = events.filter(event => {
    const matchesName = event.name.toLowerCase().includes(text);
    const matchesCategory = category === "" || event.category === category;
    const matchesType = type === "" || event.type === type;

    let matchesDate = true;
    if (dateRule === "free") {
      matchesDate = event.price === 0;
    } else if (dateRule !== "") {
      const days = (new Date(event.date) - today) / (1000 * 60 * 60 * 24);
      matchesDate = days >= 0 && days <= Number(dateRule);
    }

    return matchesName && matchesCategory && matchesType && matchesDate;
  });

  const list = document.getElementById("list");
  if (result.length === 0) {
    list.innerHTML = '<div class="empty">No events match. Try a different word or clear the filters.</div>';
  } else {
    list.innerHTML = result.map(cardHTML).join("");
  }
  document.getElementById("count").textContent =
    result.length + (result.length === 1 ? " event" : " events") + " found";
}

// Run the filter whenever the user types or changes a dropdown
[searchInput, categorySelect, typeSelect, dateSelect].forEach(el =>
  el.addEventListener("input", applyFilters)
);

// Clear button
document.getElementById("clearBtn").addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "";
  typeSelect.value = "";
  dateSelect.value = "";
  applyFilters();
});

// Category tiles on the homepage set the category filter
document.querySelectorAll("[data-category]").forEach(tile => {
  tile.addEventListener("click", () => {
    categorySelect.value = tile.dataset.category;
    applyFilters();
  });
});

applyFilters();  // show all events when the page loads
// ---------- Event details page ----------
function renderDetail(event) {
  const extra = eventExtras[event.id];

  const scheduleItems = extra.schedule
    .map(row => `<li><b>${row[0]}</b>${row[1]}</li>`)
    .join("");

  document.getElementById("detail").innerHTML = `
    <a class="back" href="#events">← Back to events</a>
    <div class="detail-grid">
      <div>
        <div class="detail-poster" style="background: linear-gradient(135deg,
             hsl(${event.hue} 70% 30%), hsl(${event.hue + 50} 80% 50%))">
          ${event.name}
        </div>
        <span class="tag">${event.category}</span>
        <h2>${event.name}</h2>
        <p>${extra.details}</p>

        <div class="facts">
          <div><small>Date and time</small>${formatDate(event)}</div>
          <div><small>Type</small>${event.type}</div>
          <div><small>Price</small>${formatPrice(event.price)}</div>
        </div>

        <div class="panel">
          <h3>Schedule</h3>
          <ul class="schedule">${scheduleItems}</ul>
        </div>

        <div class="panel">
          <h3>Organizer</h3>
          <p>${extra.organizer.name}<br>${extra.organizer.email}</p>
        </div>

        <div class="panel">
          <h3>Venue</h3>
          <p><b>${event.venue}</b><br>${extra.venueInfo}</p>
        </div>
      </div>

      <aside class="panel ticket-box">
        <h3>Tickets</h3>
        <div class="price">${formatPrice(event.price)}</div>
        <p class="muted">${event.price === 0
          ? "Free, registration required"
          : "Per ticket, up to 10 per booking"}</p>
        <a class="btn" href="#book-${event.id}">
          ${event.price === 0 ? "Register now" : "Book tickets"}
        </a>
      </aside>
    </div>`;
}
// ---------- Booking form ----------
const bkEvent = document.getElementById("bkEvent");
const bookForm = document.getElementById("bookForm");
let ticketCount = 1;

// Fill the event dropdown from our data
bkEvent.innerHTML =
  '<option value="">Choose an event</option>' +
  events.map(e => `<option value="${e.id}">${e.name} (${formatPrice(e.price)})</option>`).join("");

// Ticket stepper and live total
function updateTotal() {
  const event = events.find(e => e.id === Number(bkEvent.value));
  document.getElementById("qty").textContent = ticketCount;
  document.getElementById("total").textContent =
    event ? formatPrice(event.price * ticketCount) : "KES 0";
}
document.getElementById("plus").addEventListener("click", () => {
  if (ticketCount < 10) ticketCount++;
  updateTotal();
});
document.getElementById("minus").addEventListener("click", () => {
  if (ticketCount > 1) ticketCount--;
  updateTotal();
});
bkEvent.addEventListener("input", updateTotal);

// Validation rules: each returns "" when valid, or an error message
const rules = {
  bkEvent: v => v ? "" : "Choose an event.",
  bkName:  v => v.trim().length >= 3 ? "" : "Enter your full name (at least 3 letters).",
  bkEmail: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
                  ? "" : "Enter a valid email, like name@example.com.",
  bkPhone: v => /^\+?[0-9\s-]{9,15}$/.test(v.trim())
                  ? "" : "Enter a phone number with 9 to 15 digits."
};

function validateField(id) {
  const input = document.getElementById(id);
  const message = rules[id](input.value);
  input.classList.toggle("invalid", message !== "");
  document.getElementById("err-" + id).textContent = message;
  return message === "";
}

// Check each field when the user leaves it
Object.keys(rules).forEach(id =>
  document.getElementById(id).addEventListener("blur", () => validateField(id))
);

// Stop user text from being treated as HTML
function escapeHTML(text) {
  return text.replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Submit
bookForm.addEventListener("submit", e => {
  e.preventDefault();

  // Check every field (no short-circuit, so all errors show at once)
  const results = Object.keys(rules).map(validateField);
  if (results.includes(false)) {
    document.querySelector(".invalid").focus();
    return;
  }

  const event = events.find(ev => ev.id === Number(bkEvent.value));
  const ref = "KSY-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  const email = escapeHTML(document.getElementById("bkEmail").value.trim());
  const name = escapeHTML(document.getElementById("bkName").value.trim());

  document.getElementById("bookDone").innerHTML = `
    <div class="ticket">
      <h2>You’re booked, ${name}!</h2>
      <p>A confirmation will be sent to ${email}</p>
      <div class="ref">${ref}</div>
      <p><b>${event.name}</b><br>${formatDate(event)}<br>${event.venue}</p>
      <p>${ticketCount} ticket${ticketCount > 1 ? "s" : ""} · ${formatPrice(event.price * ticketCount)}</p>
      <div class="cta">
        <a class="btn" href="#events">Browse more events</a>
        <button class="btn btn-outline" type="button" onclick="window.print()">Print ticket</button>
      </div>
    </div>`;

  document.getElementById("bookFormWrap").hidden = true;
  document.getElementById("bookDone").hidden = false;
  bookForm.reset();
  ticketCount = 1;
  updateTotal();
  window.scrollTo(0, 0);
});

// Called by the router when the booking page opens
function showBooking(eventId) {
  document.getElementById("bookFormWrap").hidden = false;
  document.getElementById("bookDone").hidden = true;
  if (eventId) bkEvent.value = eventId;   // pre-select the event
  updateTotal();
}
// ---------- Simple page router (uses the # in the address) ----------
const views = ["homeView", "detailView", "bookView"];

function showView(name) {
  views.forEach(id => { document.getElementById(id).hidden = id !== name; });
}

function route() {
  const hash = location.hash.slice(1);

  if (hash.startsWith("event-")) {
    const event = events.find(e => e.id === Number(hash.slice(6)));
    if (event) {
      renderDetail(event);
      showView("detailView");
      window.scrollTo(0, 0);
      return;
    }
  }

  if (hash.startsWith("book")) {            // #book or #book-3
    showBooking(hash.split("-")[1]);
    showView("bookView");
    window.scrollTo(0, 0);
    return;
  }

  // Anything else shows the home view and scrolls to that section
  showView("homeView");
  const target = hash ? document.getElementById(hash) : null;
  if (target) target.scrollIntoView();
  else window.scrollTo(0, 0);
}

window.addEventListener("hashchange", route);

// ---------- Highlight the current page in the navbar ----------
function highlightNav() {
  const hash = location.hash;
  document.querySelectorAll(".links a").forEach(link => {
    const target = link.getAttribute("href");
    const isEvents = target === "#events" && hash.startsWith("#event");
    const isBook = target === "#book" && hash.startsWith("#book");
    const isHome = target === "#home" && (hash === "" || hash === "#home");
    link.classList.toggle("active", isEvents || isBook || isHome || target === hash);
  });
}
window.addEventListener("hashchange", highlightNav);

// ---------- Dark mode ----------
const themeBtn = document.getElementById("themeBtn");

function deviceIsDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function isDark() {
  const chosen = document.documentElement.dataset.theme;
  return chosen ? chosen === "dark" : deviceIsDark();
}

function updateThemeLabel() {
  themeBtn.textContent = isDark() ? "Light mode" : "Dark mode";
}

// Restore the saved choice (wrapped in try/catch in case storage is blocked)
try {
  const saved = localStorage.getItem("theme");
  if (saved) document.documentElement.dataset.theme = saved;
} catch (err) {}
updateThemeLabel();

themeBtn.addEventListener("click", () => {
  const next = isDark() ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (err) {}
  updateThemeLabel();
});

// ---------- Countdown to the next event ----------
function eventStart(event) {
  return new Date(event.date + "T" + event.time);
}

function nextEvent() {
  const now = new Date();
  const upcoming = events
    .filter(e => eventStart(e) > now)
    .sort((a, b) => eventStart(a) - eventStart(b));
  return upcoming[0];   // undefined when every event is in the past
}

function updateCountdown() {
  const box = document.getElementById("nextEvent");
  const event = nextEvent();

  if (!event) {
    box.innerHTML = `<h3>No upcoming events</h3><p>Check back soon.</p>`;
    return;
  }

  const ms = eventStart(event) - new Date();
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor(ms / 3600000) % 24;
  const minutes = Math.floor(ms / 60000) % 60;
  const seconds = Math.floor(ms / 1000) % 60;

  box.innerHTML = `
    <p class="eyebrow">Happening next</p>
    <h3>${event.name}</h3>
    <div class="countdown" role="timer">
      <div><b>${days}</b><span>days</span></div>
      <div><b>${hours}</b><span>hrs</span></div>
      <div><b>${minutes}</b><span>min</span></div>
      <div><b>${seconds}</b><span>sec</span></div>
    </div>
    <a class="btn btn-yellow" href="#event-${event.id}">Get tickets</a>`;
}

updateCountdown();
setInterval(updateCountdown, 1000);   // refresh every second
// ---------- Start the app (keep these last) ----------
highlightNav();
route();