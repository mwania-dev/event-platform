# Kusanya – Event Booking Platform

A responsive event booking website where users can browse events, view details
and book tickets online. Built with HTML, CSS and JavaScript only.

**Author:** [Annceta]
**Live demo:** [ https://mwania-dev.github.io/event-platform/]

## Features
- Homepage with hero banner, event categories and call-to-action buttons
- Event listing with poster, date and time, venue, price and description
- Event details page with schedule, organizer, venue and ticket information
- Booking form with validation (event, name, email, phone, number of tickets)
- Search by name, and filters by category, type and date
- Responsive layout for mobile, tablet and desktop
- Navigation bar, footer with social and contact links, smooth navigation
- Bonus: dark mode, live countdown timer, ticket confirmation page

## Technologies
- HTML5
- CSS3 (Grid, Flexbox, CSS variables, media queries)
- JavaScript (ES6)

## Project structure
| File | Purpose |
|------|---------|
| `index.html` | Page structure for all views |
| `css/style.css` | Styles, responsive rules and dark mode |
| `js/events.js` | Event data (name, date, price, schedule, organizer) |
| `js/script.js` | Event cards, search and filters, page switching, form validation, countdown, dark mode |

## How it works
- **Event data:** events are stored as a JavaScript array. Adding an event
  to the array adds a new card automatically.
- **Pages:** the site is a single page. The part of the address after `#`
  decides which view is shown (home, event details or booking).
- **Validation:** each form field has a rule that returns an error message
  or nothing. Fields are checked when the user leaves them and again on submit.
- **Dark mode:** colours are CSS variables, so switching the theme changes
  the variables. The choice is saved in the browser.

## How to run
1. Download the project folder.
2. Open `index.html` in a web browser.

## Screenshots
![Homepage](screenshots/01-home.png)
![Search](screenshots/02-search.png)
![Event details](screenshots/03-event-details.png)
![Booking form errors](screenshots/04-booking-errors.png)
![Confirmation ticket](screenshots/05-confirmation.png)
![Dark mode](screenshots/06-dark-mode.png)
![Mobile view](screenshots/07-home-mobile.png)
![Mobile menu](screenshots/08-menu-mobile.png)
![Booking form](screenshots/09-booking-tablet.png)

## Limitations and future improvements
- Bookings are not saved, because there is no backend or database yet.
- Payment is not included.
- Possible additions: login and signup, payment screen, admin dashboard.
