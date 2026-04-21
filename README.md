# Shoply 2 — E-Commerce Web App

A fully responsive, scalable front-end e-commerce application inspired by platforms like Amazon and Noon.
Built with React, Context API, and a clean component-based architecture focused on performance and user experience.

🔗 **Live Demo:** [singular-mochi-27f942.netlify.app](https://singular-mochi-27f942.netlify.app/)

---

## Overview

Shoply 2 is a front-end e-commerce project that allows users to browse products, search by keyword, filter by category, manage a shopping cart, and save favorite items.

Product data is fetched from the [DummyJSON API](https://dummyjson.com/) using Axios.
Authentication, cart, and favorites are managed via **React Context API** and **localStorage**.

---

## Features

- 🔍 Product search with real-time filtering
- 🛍 Add / remove items from cart with quantity control
- ❤️ Add / remove items from favorites
- 👤 Login & Register system (localStorage-based)
- 🗂 Browse and filter products by category
- 📄 Category details page with pagination
- ⚡ Fully responsive design across all screen sizes
- 🔄 Global state management using React Context API

---

## Tech Stack

| Category           | Technology                    |
|--------------------|-------------------------------|
| Framework          | React 18 (Vite)               |
| State Management   | React Context API (useContext)|
| Routing            | React Router DOM              |
| HTTP Client        | Axios                         |
| Styling            | Tailwind CSS, Sass (SCSS)     |
| UI Utilities       | React Icons, React Hot Toast  |
| API                | DummyJSON API                 |
| Deployment         | Netlify                       |

---

## State Management

React Context API manages the following contexts:

- **CartContext** — add, remove, update quantity, persist to localStorage
- **FavoritesContext** — add / remove favorites, persist to localStorage
- **AuthContext** — user authentication state, persist to localStorage

---

## Project Structure

```
src/
├── components/       # Reusable UI components (NavBar, ProductCard, Pagination...)
├── pages/            # Route-level pages (Home, Category, ProductDetails, Cart...)
├── context/          # React Context providers (CartContext, FavoritesContext, AuthContext)
├── hooks/            # Custom React hooks
├── styles/           # Global SCSS files
└── main.jsx          # App entry point
```

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Mazen-Walid0/E-Commerce-Project-Shoply-2.git

# Navigate into the project directory
cd E-Commerce-Project-Shoply-2

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## Author

**Mazen Walid** — Front-End Developer
- Email: mazenwalid385@gmail.com
