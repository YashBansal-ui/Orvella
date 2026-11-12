# Orvella — Employee Management System Frontend

A responsive frontend prototype based on the Orvella Figma panels. It uses **Node.js, Express and EJS** and includes sample data so the screens run without connecting a database.

## Screens included

- Admin dashboard — workforce metrics, latest employees, department distribution and activity
- HR dashboard — people operations overview
- Manager dashboard — team overview and leave approvals
- Employee dashboard — leave balances and personal leave activity
- Employee directory — sample records, search, department/status filters and an Add Employee modal
- Leave approvals — select a request, inspect details, approve or reject it in local demo state
- Leave application — balance cards, dates, leave type and reason form
- Sign-in page — demo entry point

## Run locally

Requires Node.js 18 or later.

```bash
cd orvella-frontend
npm install
npm start
```

Open **http://localhost:3000**.

## Demo navigation

- `/login` — sign-in screen (any email/password works in this prototype)
- `/admin` — Admin panel
- `/hr` — HR panel
- `/hr/employees` — employee directory
- `/manager` — Manager panel
- `/manager/leaves` — leave approvals
- `/employee` — Employee panel
- `/employee/leave/apply` — leave application

## Notes before connecting your backend

This is a frontend prototype with sample records. The Add Employee modal and leave approval decisions are browser-local only and reset when the page reloads. The leave form posts to an Express demo route and displays a confirmation; it does not yet write to MongoDB.

To integrate it into your existing Express app:

1. Copy `views/` into your project (or merge these EJS views with your existing views).
2. Copy `public/css/style.css` and `public/js/app.js` into your static assets.
3. Reuse the routes and mock data shape in `server.js` / `data.js`, then replace the sample arrays with your Mongoose queries.
4. Add your existing authentication middleware to role-specific routes and protect each dashboard according to the logged-in user's role.

Keep the authorization checks on the server. Hiding a navigation link in the frontend is not a security boundary.
