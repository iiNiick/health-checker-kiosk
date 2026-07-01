# BMWhy. — Health Self-Check Kiosk

A modern, secure, and responsive web-based health self-check kiosk designed to evaluate Body Mass Index (BMI). This platform provides a private, automated space for users to check their baseline health metrics, featuring an interactive gauge display and live remote telemetry database synchronization.

🔗 **[Launch Live Kiosk Demo](https://iiniick.github.io/health-checker-kiosk/)**

---

## 📋 Problem Statement & Solution

### The Problem
Traditional health screening procedures in facilities or community halls often rely on manual paper logging and slow calculations. This setup introduces several inefficiencies:
1. **Bottlenecks & Overhead:** Manual formula calculation slows down the check-in process, causing queues.
2. **Privacy Concerns:** Recording sensitive physical attributes on shared, open log sheets compromises user privacy.
3. **Data Silos & Loss:** Paper-based records are highly vulnerable to physical damage and require tedious manual entry to digitize for health monitoring.

### The Solution
**BMWhy.** addresses these challenges by transforming health screening into an automated, self-contained kiosk interface:
* **Immediate, Private Baseline:** Users key in parameters privately and get instant results through a secure interface without manual intervention.
* **Automated Data Capture:** Eliminates manual data entry by serializing submissions and instantly streaming them to a centralized digital database ledger.
* **Error Prevention:** Built-in client-side validation rules out human arithmetic mistakes, ensuring only clean data is processed.

---

## 🚀 Key Features

* **Real-Time Telemetry Processing:** Instantly processes raw body parameters into high-precision wellness statistics.
* **Dynamic Interactive Gauge:** Features a smooth, CSS-animated gauge pointer that shifts dynamically based on user classifications.
* **Automated Data Syncing:** Form submissions automatically serialize user entries and securely stream them to a remote database matrix.
* **Fluid Responsive Canvas:** Built using CSS Grid and Custom Properties (`:root`), ensuring seamless layouts across desktop kiosks, tablets, and smartphones.

---

## 🛠️ Architecture & Technical Stack

* **Frontend Framework:** Standard Semantic HTML5, CSS3 Custom Properties (Variables), Flexbox, and CSS Grid.
* **Typography:** `Plus Jakarta Sans` via Google Fonts.
* **Runtime Logic:** Vanilla Javascript (ES6+) utilizing async operations and programmatic DOM manipulation.
* **Backend Database Integration:** Remote cloud connection using asynchronous `fetch` requests streaming payloads securely to an external processor endpoint.

---

## ⚙️ Project File Structure

```text
├── index.html       # Structural layout and telemetry DOM nodes
├── style.css        # Premium user interface styles, animations, and media queries
├── script.js        # Form validation, metrics calculation, and database synchronization logic
└── README.md        # Comprehensive system documentation
