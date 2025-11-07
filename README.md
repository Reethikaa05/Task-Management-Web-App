# 🚀 Task Glitch — Fixed & Enhanced 
This repository contains the **debugged, optimized, and production-ready version** of the **Task Glitch App**, originally built for tracking, managing, and prioritizing tasks based on ROI (Return on Investment).

🛠️ **Challenge Overview:**  
The base app was functional but had several **hidden UI, logic, and performance bugs**.  
My mission was to identify, analyze, and fix **5 critical bugs** — ensuring a stable, consistent, and user-friendly experience.

---

## 🌟 Live Demo  
🔗 **Deployed on Vercel:** [https://task-management-web-app-6gzu.vercel.app/](https://task-management-web-app-6gzu.vercel.app/)

---

## 🧩 Project Overview  

**Task Glitch** helps sales teams:
- Add, edit, and delete tasks  
- Track **Revenue**, **Time Taken**, and **ROI**  
- Prioritize work using **High / Medium / Low** flags  
- View analytics: **Total Revenue, Average ROI, Efficiency & Grade**  
- Sort, search, and filter seamlessly  
- Undo deletions with a **Snackbar feature**  
- Persist data via **LocalStorage**  
- Import/Export tasks as **CSV files**

---

## 🐞 Fixed Bugs Summary

### 🧠 1️⃣ Double Fetch Issue
**Problem:** The app fetched tasks twice on load due to React StrictMode and duplicate useEffect calls.  
**Fix:** Added a `useRef` guard and corrected the dependency array to ensure the fetch runs **exactly once**.

✅ **Result:** API/data load executes once per page load.  
No duplicate tasks, no repeated logs.

---

### 🔁 2️⃣ Undo Snackbar Bug
**Problem:** “Undo Delete” restored old tasks even after the snackbar closed.  
**Fix:** Snackbar’s close handler now resets `lastDeletedTask` and `isDeleted` states properly.

✅ **Result:** Undo only works during the active snackbar window.  
No ghost/phantom data reappears.

---

### 🔀 3️⃣ Unstable Sorting (ROI Ties)
**Problem:** Tasks with same ROI & Priority flickered due to non-deterministic sorting.  
**Fix:** Implemented **stable sorting** logic:

ROI (desc) → Priority (High→Low) → Title (A–Z) → CreatedAt (Newest)


✅ **Result:** Task order is **consistent**, **stable**, and **flicker-free**.

---

### 🧰 4️⃣ Double Dialog Opening
**Problem:** Edit/Delete triggered View dialog as well due to event bubbling.  
**Fix:** Added `e.stopPropagation()` for all action buttons.

✅ **Result:** Only the intended dialog opens.  
Smooth modal transitions without overlap.

---

### 📊 5️⃣ ROI Calculation & Validation
**Problem:** ROI showed `Infinity`, `NaN`, or blank values when `time = 0` or invalid input.  
**Fix:** Safe ROI computation:

ROI = time > 0 ? (revenue / time).toFixed(2) : "—"

Also handled empty/invalid inputs gracefully.

✅ Result:

No crash on invalid data

Properly formatted decimals

Reliable and accurate ROI display

💻 How to Run Locally

# 1️⃣ Install dependencies
npm install

# 2️⃣ Start development server
npm start

App runs on:  http://localhost:5173/


☁️ Deployment Steps (Vercel)
Push the project to GitHub

Visit https://vercel.com → Import GitHub Repo

Click Deploy

Get your live link like
👉 https://task-management-web-app-6gzu.vercel.app/


# 🧠 Key Learnings & Improvements
Debugging complex React side effects

Ensuring deterministic sorting algorithms

Managing transient UI states (Snackbar, Dialogs)

Implementing robust data validation for calculations

Delivering production-ready apps with clear UX logic


# 📂 Tech Stack
⚛️ React.js (Hooks & Context)

💅 Styled Components / CSS

🧮 LocalStorage (Data Persistence)

📈 CSV Import/Export

🚀 Deployed on Vercel

# 🏁 Final Outcome
✅ All 5 bugs fixed
✅ Fully stable and optimized app
✅ Clean, readable codebase with clear logic separation
✅ Professional deployment ready for review

# 👩‍💻 Developed by Reethika Selvam
“Debugging is like detective work — every clue leads to cleaner code and smarter design.”



