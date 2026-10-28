const events = [
  {
    id: 1,
    name: "Nairobi Jazz Nights",
    category: "Music",
    date: "2026-11-14",
    time: "19:00",
    venue: "Alchemist Courtyard, Westlands",
    price: 1500,
    type: "In person",
    hue: 260,
    description: "An open-air evening of live jazz with five bands."
  },
  {
    id: 2,
    name: "Web Dev Bootcamp Day",
    category: "Workshop",
    date: "2026-11-07",
    time: "09:00",
    venue: "iHub, Ngong Road",
    price: 2000,
    type: "In person",
    hue: 215,
    description: "Build and deploy a responsive website in one day."
  },
  {
    id: 3,
    name: "Climate Futures Seminar",
    category: "Seminar",
    date: "2026-11-20",
    time: "10:00",
    venue: "UN Complex, Gigiri",
    price: 0,
    type: "In person",
    hue: 150,
    description: "Speakers on clean energy and adaptation in East Africa."
  },
  {
    id: 4,
    name: "Lake Naivasha Music Fest",
    category: "Festival",
    date: "2026-12-05",
    time: "12:00",
    venue: "Naivasha Lakeside",
    price: 3500,
    type: "In person",
    hue: 30,
    description: "Two days of music, camping and lakeside food."
  },
  {
    id: 5,
    name: "City Marathon 10K",
    category: "Sports",
    date: "2026-12-13",
    time: "06:30",
    venue: "Uhuru Park, CBD",
    price: 1000,
    type: "In person",
    hue: 340,
    description: "A friendly 10K run through the heart of Nairobi."
  },
  {
    id: 6,
    name: "Startup Pitch Night",
    category: "Seminar",
    date: "2026-12-02",
    time: "18:00",
    venue: "Online (Zoom)",
    price: 0,
    type: "Online",
    hue: 285,
    description: "Eight founders pitch live to a panel of investors."
  }
];
const eventExtras = {
  1: {
    details: "Five bands, one courtyard, and a late-night jam session where guest musicians join the stage. Food trucks and a full bar are on site.",
    organizer: { name: "Kusanya Live", email: "live@kusanya.example" },
    venueInfo: "Open-air courtyard. Parking is available on site, and the venue is a short walk from the Westlands matatu stage.",
    schedule: [["19:00", "Doors open"], ["19:45", "Opening act"], ["21:00", "Headline band"], ["23:00", "Open jam"]]
  },
  2: {
    details: "A hands-on day for beginners. You will write HTML, CSS and JavaScript, then deploy your site to a live link before you leave. Bring a laptop.",
    organizer: { name: "CodeBridge Africa", email: "hello@codebridge.example" },
    venueInfo: "Second floor training room with Wi-Fi and power sockets at every seat. Lunch is not included.",
    schedule: [["09:00", "Setup and HTML"], ["11:00", "CSS layouts"], ["13:00", "Lunch break"], ["14:00", "JavaScript basics"], ["16:30", "Deploy your site"]]
  },
  3: {
    details: "Three panels featuring researchers, policy makers and startup founders. Entry is free, but registration is required to hold your seat.",
    organizer: { name: "Green Horizon Trust", email: "events@greenhorizon.example" },
    venueInfo: "Conference hall with step-free access. Bring a photo ID for security at the gate.",
    schedule: [["10:00", "Welcome"], ["10:30", "Panel: clean energy"], ["12:00", "Panel: adaptation"], ["14:00", "Networking"]]
  },
  4: {
    details: "Over twenty artists across two stages, camping spots, and a craft market. Gates open at noon on Saturday.",
    organizer: { name: "Rift Valley Events", email: "info@riftvalley.example" },
    venueInfo: "Lakeside grounds with camping, toilets and drinking water. Shuttles run from Naivasha town.",
    schedule: [["12:00", "Gates open"], ["15:00", "Stage 2 sets"], ["19:00", "Main stage"], ["23:30", "Fireworks"]]
  },
  5: {
    details: "A timed 10K with water stations every 2.5 km. Every finisher receives a medal and a t-shirt.",
    organizer: { name: "Nairobi Runners Club", email: "run@nairobirunners.example" },
    venueInfo: "Start and finish at Uhuru Park. Roads on the route are closed from 6:00.",
    schedule: [["05:45", "Bib collection"], ["06:30", "Start"], ["08:30", "Medals"]]
  },
  6: {
    details: "Watch eight pitches, vote for your favourite, and join the live Q&A with the investors. The link is emailed after you register.",
    organizer: { name: "Savannah Ventures", email: "pitch@savannah.example" },
    venueInfo: "Online event on Zoom. Join from anywhere with a stable internet connection.",
    schedule: [["18:00", "Introduction"], ["18:20", "Pitches"], ["19:30", "Q&A"], ["20:00", "Winner announced"]]
  }
};