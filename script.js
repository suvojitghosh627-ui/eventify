const events = [
  {
    title: "Sunset Sessions: Rooftop Edition",
    category: "Music",
    day: "24",
    month: "OCT",
    time: "Fri, 6:30 PM",
    place: "Skyline Social Club",
    area: "Koramangala",
    price: "₹499",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "The Sunday Farmers Market",
    category: "Food",
    day: "26",
    month: "OCT",
    time: "Sun, 9:00 AM",
    place: "The Greenhouse",
    area: "Indiranagar",
    price: "Free",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Clay & Chai: Pottery Social",
    category: "Arts",
    day: "25",
    month: "OCT",
    time: "Sat, 11:00 AM",
    place: "Studio Mitti",
    area: "Jubilee Hills",
    price: "₹850",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "City Lights Night Run",
    category: "Outdoors",
    day: "31",
    month: "OCT",
    time: "Fri, 7:00 PM",
    place: "Lalbagh West Gate",
    area: "Central Bengaluru",
    price: "₹299",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Indie Film Club: New Voices",
    category: "Arts",
    day: "26",
    month: "OCT",
    time: "Sun, 5:30 PM",
    place: "Ranga Shankara",
    area: "JP Nagar",
    price: "₹250",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85"
  },
  {
    title: "Brunch & Beats at Olive",
    category: "Food",
    day: "25",
    month: "OCT",
    time: "Sat, 12:00 PM",
    place: "Olive Beach",
    area: "Ashok Nagar",
    price: "₹699",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd7184f8b5?auto=format&fit=crop&w=900&q=85"
  }
];

let selectedCategory = "All";
const favorites = new Set();

const grid = document.querySelector("#grid");
const searchInput = document.querySelector("#search");
const eventCount = document.querySelector("#count");

function renderEvents() {
  const query = searchInput.value.toLowerCase().trim();

  const filteredEvents = events.filter(event => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    const eventText =
      `${event.title} ${event.category} ${event.place} ${event.area}`.toLowerCase();

    return matchesCategory && eventText.includes(query);
  });

  eventCount.textContent =
    `${filteredEvents.length} ${filteredEvents.length === 1 ? "event" : "events"}`;

  if (filteredEvents.length === 0) {
    grid.innerHTML =
      '<div class="empty">No events match. Try a different search or category.</div>';
    return;
  }

  grid.innerHTML = filteredEvents.map(event => `
    <article class="card">
      <div class="photo" style="background-image: url('${event.image}')">
        <div class="datebadge">${event.month}<b>${event.day}</b></div>

        <button
          class="heart ${favorites.has(event.title) ? "saved" : ""}"
          aria-label="Save ${event.title}"
          data-heart="${event.title}">
          ${favorites.has(event.title) ? "♥" : "♡"}
        </button>
      </div>

      <div class="cardbody">
        <div class="tag">${event.category}</div>
        <h3>${event.title}</h3>
        <div class="meta">◷ ${event.time}</div>
        <div class="meta">⌖ ${event.place} · ${event.area}</div>

        <div class="foot">
          <span class="price">${event.price}</span>
          <a class="open" href="#" data-event="${event.title}">Get tickets ↗</a>
        </div>
      </div>
    </article>
  `).join("");
}

document.querySelector("#filters").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  selectedCategory = button.dataset.category;

  document.querySelectorAll(".pill").forEach(pill => {
    pill.classList.toggle("active", pill === button);
  });

  renderEvents();
});

searchInput.addEventListener("input", renderEvents);
document.querySelector("#searchBtn").addEventListener("click", renderEvents);

grid.addEventListener("click", event => {
  const heartButton = event.target.closest("[data-heart]");

  if (heartButton) {
    const title = heartButton.dataset.heart;

    if (favorites.has(title)) {
      favorites.delete(title);
    } else {
      favorites.add(title);
    }

    renderEvents();
  }

  const ticketLink = event.target.closest("[data-event]");

  if (ticketLink) {
    event.preventDefault();
    showToast("Ticket booking is coming soon!");
  }
});

document.querySelector("#dateFilter").addEventListener("click", () => {
  showToast("Date filters are coming soon!");
});

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

renderEvents();