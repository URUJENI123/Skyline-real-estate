# Skyline Real Estate – Project Documentation
**Module:** FRONT-END Development (ECOFD601 / ITLDF601)  
**Institution:** Rwanda Polytechnic – Musanze College  
**Academic Year:** 2025 – 2026, Semester Two  
**Date:** 16th April 2026

---

## 1. Website Purpose

**Skyline Real Estate** is a professional, fully responsive multi-page website for a fictional real estate company operating in East Africa. The platform enables prospective buyers, renters, and sellers to browse premium property listings, connect with expert agents, explore property galleries, and contact the company directly.

The website simulates a real-world real estate portal, showcasing the agency's services, team, and properties in a visually compelling and user-friendly manner.

---

## 2. Tools and Technologies Used

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic elements) |
| Styling | CSS3 (custom properties, flexbox, grid, media queries) |
| Interactivity | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.5 (CDN) |
| Fonts | Google Fonts – Cormorant Garamond & DM Sans |
| Images | Unsplash (free-use photography) |
| Version Control | Manual file structure |

---

## 3. Pages Included (7 Pages)

1. **Home (index.html)** – Hero section, featured listings, why choose us, image slider, testimonials
2. **About Us (about.html)** – Company story, stats, values, leadership team
3. **Listings (listings.html)** – Full property grid with filter controls (type, bedrooms, price, location)
4. **Agents (agents.html)** – Agent profiles with stats, social links, and a Join Team section
5. **Gallery (gallery.html)** – Filterable photo gallery with lightbox modal
6. **Blog / News (blog.html)** – Featured article + blog card grid
7. **Contact (contact.html)** – Contact form with validation, FAQ accordion, contact info

---

## 4. Key Features Implemented

### HTML5 Structure
- Semantic elements: `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>`
- ARIA labels for accessibility
- `<meta>` tags for SEO and viewport

### CSS3 Styling
- CSS Custom Properties (variables) for consistent theming
- Flexbox and CSS Grid for responsive layouts
- CSS transitions and hover effects on all interactive elements
- Scroll-triggered reveal animations using `IntersectionObserver`
- Fully responsive across desktop (1200px+), tablet (768px), and mobile (480px)
- Sticky navigation bar with blur backdrop filter

### JavaScript Interactivity (5+ features)
1. **Dark/Light Mode Toggle** – Persisted via `localStorage`, applies `data-theme` attribute
2. **Image Slider/Carousel** – Auto-playing with manual prev/next controls and dot indicators
3. **Form Validation** – Contact form validates required fields, email format, and displays inline error messages with a success confirmation
4. **Property Modal Popup** – Click any property card to open a detailed modal with image, price, and metadata
5. **Counter Animation** – Statistics count up from zero when scrolled into view
6. **Real-Time Clock** – Live HH:MM:SS clock in the footer
7. **Dynamic Greeting** – Displays Good Morning/Afternoon/Evening based on local time
8. **Hamburger Menu** – Responsive mobile navigation with animated toggle
9. **FAQ Accordion** – Smooth expand/collapse on contact page
10. **Gallery Filter + Lightbox** – Category filter tabs and click-to-enlarge modal on gallery page

---

## 5. Design Approach

- **Color Palette:** Deep purple (#7c5cbf) as primary, soft lavender accent (#c8b8f8), dark navy for backgrounds
- **Typography:** Cormorant Garamond (elegant display) + DM Sans (clean body text)
- **Layout:** Asymmetric hero, card-based listings, editorial blog layout
- **Aesthetic:** Luxury real estate — refined, premium, and modern

---

## 6. Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Maintaining consistent theme across 7 pages | Centralized CSS variables and a shared `style.css` file |
| Dark mode without page reload | Used `data-theme` attribute on `<html>` and CSS variable overrides |
| Property card data reuse across pages | Stored properties in a JS array in `main.js` and used DOM injection |
| Responsive navigation on mobile | Implemented hamburger menu with CSS class toggling |
| Image slider timing and manual control | Used `setInterval` with `clearInterval` on manual navigation |

---

*Submitted for Rwanda Polytechnic Front-End Development Practical Exam – April 2026*
