# Laminar Flow Ventures - High-End Water Engineering Website

![Laminar Flow Ventures](https://img.shields.io/badge/Status-Production%20Ready-00F2FE?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

Welcome to the official web repository for **Laminar Flow Ventures**, a premier firm specializing in **Water Engineering Works, Bespoke Fluid System Designs, Computational Fluid Dynamics (CFD), and Industrial Equipment Sales**.

---

## 🌟 Key Features & Architecture

1. **Interactive Canvas Fluid Simulation (`laminar_simulation.js`)**:
   - Real-time 60fps mathematical model of non-turbulent fluid streamlines (Poiseuille potential flow).
   - Interactive mouse force-field deflection demonstrating laminar vs. vortex vs. turbulent flow regimes.
   - On-screen controls to adjust stream velocity and flow regimes dynamically.

2. **Hydraulic & Pipe Sizing Calculator (`app.js`)**:
   - Real-time calculation of fluid velocity \(V\), Reynolds number \(Re\), and friction head loss \(h_f\).
   - Dynamic classification of flow state (*Laminar Flow (Optimal)* vs *Turbulent Flow*).
   - One-click auto-filling into the project inquiry form.

3. **Core Business Pillars Showcase**:
   - **Water Engineering Works**: Infrastructure, pump stations, municipal networks, reservoir spillways.
   - **Hydraulic Systems Design**: 3D CAD modeling, CFD fluid optimization, EIA blueprints.
   - **Equipment & Product Sales**: High-efficiency centrifugal pumps, laminar nozzles, telemetry meters, control valves.

4. **Filterable Portfolio & Case Studies**:
   - Interactive filtering across Works, Designs, and Sales categories.
   - Glassmorphic modal dialogs detailing technical specifications.

---

## 🚀 How to Host on GitHub Pages (Step-by-Step Guide)

Your local repository is already initialized and committed! Follow these simple steps to link it to your GitHub account (`https://github.com/Christopher-Ssekyanzi`) and host it online for free using GitHub Pages:

### Step 1: Create a New Repository on GitHub
1. Go to your GitHub dashboard: [github.com/new](https://github.com/new).
2. Set the repository name to: **`laminar-flow-ventures`** (or `christopher-ssekyanzi.github.io` for a default root site).
3. Select **Public**.
4. Leave "Add a README file" **unchecked** (since we already have local files).
5. Click **Create repository**.

### Step 2: Push Local Repository to GitHub
Open your terminal in this folder (`c:\Users\austi\Downloads\Laminar Flow`) and run:

```bash
git branch -M main
git remote add origin https://github.com/Christopher-Ssekyanzi/laminar-flow-ventures.git
git push -u origin main
```

### Step 3: Enable Free Temporary Hosting on GitHub Pages
1. Navigate to your repository on GitHub: `https://github.com/Christopher-Ssekyanzi/laminar-flow-ventures`.
2. Click on **Settings** (top navigation tab).
3. On the left sidebar, click **Pages** (under Code and automation).
4. Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
5. Set **Branch** to `main` and folder to `/ (root)`.
6. Click **Save**.

Within 1–2 minutes, your website will be live at:
🌐 **`https://christopher-ssekyanzi.github.io/laminar-flow-ventures/`**

---

## 🛠️ Local Development & Testing

To test locally in any browser:
- Double-click [`index.html`](file:///c:/Users/austi/Downloads/Laminar%20Flow/index.html) to open directly in your web browser.
- Alternatively, launch a local HTTP server using Python or Node.js:
  ```bash
  python -m http.server 8080
  ```
  Then open `http://localhost:8080` in your web browser.

---

## 📄 License & Copyright
© 2026 Laminar Flow Ventures. All rights reserved. Registered for Water Engineering Works, Designs, & Sales.
