/* ==========================================================================
   Laminar Flow Ventures Limited - Master Interactive Application Logic
   Client Portal, Data Activation, & Hydraulic Engineering System
   ========================================================================== */

/* Global Unconditional Modal Closer */
window.closeModal = function() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
};

document.addEventListener('DOMContentLoaded', () => {
    try { initNavbar(); } catch(e) { console.error(e); }
    try { initPortal(); } catch(e) { console.error(e); }
    try { initPortfolio(); } catch(e) { console.error(e); }
    try { initModal(); } catch(e) { console.error(e); }
    try { initProducts(); } catch(e) { console.error(e); }
    try { initForm(); } catch(e) { console.error(e); }
    try { initSimWidget(); } catch(e) { console.error(e); }
    try { initSlideshow(); } catch(e) { console.error(e); }
    try { initProductSlideshow(); } catch(e) { console.error(e); }
    try { updateYear(); } catch(e) { console.error(e); }
});

/* Navbar Scroll & Mobile Menu Toggle */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

/* CLIENT & ENGINEER PORTAL AUTHENTICATION & DATA ACTIVATION */
function initPortal() {
    const portalModal = document.getElementById('portal-modal');
    const dashboardModal = document.getElementById('dashboard-modal');
    
    const portalBtn = document.getElementById('portal-login-btn');
    const heroPortalBtn = document.getElementById('hero-portal-trigger');
    const portalClose = document.getElementById('portal-close');
    const dashClose = document.getElementById('dash-close');
    const dashLogoutBtn = document.getElementById('dash-logout-btn');

    const tabLoginBtn = document.getElementById('tab-login-btn');
    const tabRegisterBtn = document.getElementById('tab-register-btn');
    const loginForm = document.getElementById('portal-login-form');
    const registerForm = document.getElementById('portal-register-form');

    const demoClientBtn = document.getElementById('demo-client-btn');
    const demoEngineerBtn = document.getElementById('demo-engineer-btn');

    const navUserLabel = document.getElementById('nav-user-label');
    const dashUserName = document.getElementById('dash-user-name');
    const dashUserRole = document.getElementById('dash-user-role');

    let currentUser = null;

    // EXPOSE GLOBAL METHOD FOR INSTANT HTML CLICK INVOCATION
    window.openClientPortal = function() {
        if (currentUser) {
            openDashboard();
        } else {
            if (portalModal) portalModal.classList.add('active');
        }
    };

    window.closeClientPortal = function() {
        if (portalModal) portalModal.classList.remove('active');
    };

    window.openDashboard = function() {
        window.closeClientPortal();
        if (dashboardModal) dashboardModal.classList.add('active');
    };

    window.closeDashboard = function() {
        if (dashboardModal) dashboardModal.classList.remove('active');
    };

    if (portalBtn) portalBtn.addEventListener('click', window.openClientPortal);
    if (heroPortalBtn) heroPortalBtn.addEventListener('click', window.openClientPortal);
    if (portalClose) portalClose.addEventListener('click', window.closeClientPortal);
    if (dashClose) dashClose.addEventListener('click', window.closeDashboard);

    if (portalModal) {
        portalModal.addEventListener('click', (e) => {
            if (e.target === portalModal) window.closeClientPortal();
        });
    }

    if (dashboardModal) {
        dashboardModal.addEventListener('click', (e) => {
            if (e.target === dashboardModal) window.closeDashboard();
        });
    }

    // Tab Switching
    if (tabLoginBtn && tabRegisterBtn) {
        tabLoginBtn.addEventListener('click', () => {
            tabLoginBtn.classList.add('active');
            tabRegisterBtn.classList.remove('active');
            if (loginForm) loginForm.classList.add('active');
            if (registerForm) registerForm.classList.remove('active');
        });

        tabRegisterBtn.addEventListener('click', () => {
            tabRegisterBtn.classList.add('active');
            tabLoginBtn.classList.remove('active');
            if (registerForm) registerForm.classList.add('active');
            if (loginForm) loginForm.classList.remove('active');
        });
    }

    // Login Form Submit
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('login-email');
            const email = emailInput ? emailInput.value : 'client@company.com';
            authenticateUser({
                name: email.split('@')[0].toUpperCase(),
                role: 'PROJECT CLIENT // ID: LFV-88402',
                email: email
            });
        });
    }

    // Registration Submit
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('reg-name') ? document.getElementById('reg-name').value : 'New Client';
            const company = document.getElementById('reg-company') ? document.getElementById('reg-company').value : 'Client Estate';
            const type = document.getElementById('reg-type') ? document.getElementById('reg-type').value : 'client';

            showToast(`Account Created for ${company}! Data Activated.`);
            authenticateUser({
                name: name,
                role: `${type.toUpperCase()} ACCOUNT // ID: LFV-${Math.floor(10000 + Math.random() * 90000)}`,
                company: company
            });
        });
    }

    // Demo Accounts for Quick Access
    if (demoClientBtn) {
        demoClientBtn.addEventListener('click', () => {
            authenticateUser({
                name: 'Eng. Christopher Ssekyanzi',
                role: 'CLIENT ACCOUNT // ID: LFV-88402',
                company: 'Laminar Flow Client Estate'
            });
        });
    }

    if (demoEngineerBtn) {
        demoEngineerBtn.addEventListener('click', () => {
            authenticateUser({
                name: 'Eng. Christopher (Certified Lead)',
                role: 'FIELD HYDRAULIC ENGINEER // ID: ENG-99201',
                company: 'Laminar Flow Engineering Team'
            });
        });
    }

    function authenticateUser(userObj) {
        currentUser = userObj;
        if (dashUserName) dashUserName.textContent = currentUser.name;
        if (dashUserRole) dashUserRole.textContent = currentUser.role;
        if (navUserLabel) navUserLabel.textContent = 'My Dashboard';

        showToast(`Welcome back, ${currentUser.name}!`);
        window.openDashboard();
    }

    if (dashLogoutBtn) {
        dashLogoutBtn.addEventListener('click', () => {
            currentUser = null;
            if (navUserLabel) navUserLabel.textContent = 'Client Portal';
            window.closeDashboard();
            showToast('Signed out successfully.');
        });
    }
}

/* Equipment Product Inquiry Binding */
function initProducts() {
    const productBtns = document.querySelectorAll('.product-inquire-btn');
    productBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productName = btn.dataset.product;
            const formService = document.getElementById('form-service');
            const formMsg = document.getElementById('form-message');
            if (formService) formService.value = 'sales';
            if (formMsg && productName) {
                formMsg.value = `Product Sales Quote Request:\n- Product: ${productName}\n- Quantity: 1 Set / System`;
            }
            showToast(`Selected "${productName}". Scrolling to quote form...`);
        });
    });
}

/* Portfolio Filtering */
function initPortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

/* Modal Specs System */
function initModal() {
    const modal = document.getElementById('spec-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBody = document.getElementById('modal-body');
    const triggers = document.querySelectorAll('.modal-trigger');

    if (!modal) return;

    const specData = {
        works: {
            title: "Water Engineering Works Specifications",
            content: `
                <div class="modal-spec-box">
                    <p class="modal-intro">Laminar Flow Ventures Limited provides comprehensive EPC (Engineering, Procurement, and Construction) for heavy water works.</p>
                    <ul class="modal-spec-list">
                        <li><strong>Civil & Structural:</strong> Reinforced concrete reservoirs, pump foundations, intake towers, spillways.</li>
                        <li><strong>Hydraulic Mechanical:</strong> High-pressure piping assemblies (HDPE, Ductile Iron, Stainless Steel 316L).</li>
                        <li><strong>Electrical & Telemetry:</strong> Motor control centers (MCC), VFD drives, SCADA integration.</li>
                        <li><strong>Quality Assurance:</strong> ISO 9001 quality audits, hydrostatic pressure testing up to 25 bar.</li>
                    </ul>
                </div>
            `
        },
        designs: {
            title: "Hydraulic System Design & CFD Blueprinting",
            content: `
                <div class="modal-spec-box">
                    <p class="modal-intro">Precision design using computational fluid dynamics to guarantee laminar streamline stability and zero surge failure.</p>
                    <ul class="modal-spec-list">
                        <li><strong>CFD Software:</strong> ANSYS Fluent, OpenFOAM hydraulic modeling.</li>
                        <li><strong>Transient Surge:</strong> Water hammer analysis, air valve placement, surge vessel dimensioning.</li>
                        <li><strong>CAD Deliverables:</strong> 3D BIM models, P&ID diagrams, structural CAD blueprints compliant with global codes.</li>
                    </ul>
                </div>
            `
        },
        sales: {
            title: "Equipment & Product Procurement Catalog",
            content: `
                <div class="modal-spec-box">
                    <p class="modal-intro">We supply industrial-tier pumps, laminar flow nozzles, and smart flow meters from globally certified OEMs.</p>
                    <ul class="modal-spec-list">
                        <li><strong>Pumps:</strong> Centrifugal, vertical turbine, submersible sets (0.5 to 500 L/s).</li>
                        <li><strong>Valves:</strong> Pressure reducing (PRV), air release, butterfly, non-return check valves.</li>
                        <li><strong>Smart IoT:</strong> Ultrasonic transit-time meters, wireless telemetry loggers.</li>
                    </ul>
                </div>
            `
        }
    };

    triggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const key = btn.dataset.service;
            if (specData[key] && modalBody) {
                modalBody.innerHTML = `
                    <h2 class="gradient-text" style="margin-bottom: 16px;">${specData[key].title}</h2>
                    ${specData[key].content}
                    <button type="button" class="btn btn-primary btn-close-modal-action" style="margin-top: 24px; width: 100%;" onclick="window.closeModal(); return false;">Close Details</button>
                `;
                modal.classList.add('active');
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            window.closeModal();
        });
    }

    // Document-level listener for guaranteed modal closing
    document.addEventListener('click', (e) => {
        if (!modal.classList.contains('active')) return;
        if (
            e.target === modal || 
            e.target.id === 'modal-close' || 
            e.target.closest('#modal-close') || 
            e.target.closest('.modal-close') || 
            e.target.classList.contains('btn-close-modal-action') ||
            e.target.closest('.btn-close-modal-action')
        ) {
            window.closeModal();
        }
    });

    // Keyboard ESC key handler
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            window.closeModal();
        }
    });
}

/* Simulation Controls Binding */
function initSimWidget() {
    const flowMode = document.getElementById('flow-mode');
    const particleSpeed = document.getElementById('particle-speed');
    const resetBtn = document.getElementById('sim-reset-btn');

    if (flowMode) {
        flowMode.addEventListener('change', (e) => {
            if (window.laminarSim) window.laminarSim.setMode(e.target.value);
        });
    }

    if (particleSpeed) {
        particleSpeed.addEventListener('input', (e) => {
            if (window.laminarSim) window.laminarSim.setSpeed(e.target.value);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (window.laminarSim) {
                window.laminarSim.setMode('laminar');
                window.laminarSim.setSpeed(3.5);
                if (flowMode) flowMode.value = 'laminar';
                if (particleSpeed) particleSpeed.value = 4;
                showToast('Canvas simulation reset to baseline Laminar flow.');
            }
        });
    }
}

/* Form Submission & Toast Feedback */
function initForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thank you! Your engineering inquiry has been received.');
            form.reset();
        });
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (toast && toastMsg) {
        toastMsg.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

function updateYear() {
    const yr = document.getElementById('year');
    if (yr) yr.textContent = new Date().getFullYear();
}

/* REAL PROJECT MEDIA SLIDESHOW CAROUSEL */
function initSlideshow() {
    const container = document.getElementById('about-slideshow');
    if (!container) return;

    const slides = container.querySelectorAll('.slideshow-slide');
    const dots = container.querySelectorAll('.slideshow-dot');
    const prevBtn = document.getElementById('slideshow-prev');
    const nextBtn = document.getElementById('slideshow-next');

    if (!slides.length) return;

    let currentIndex = 0;
    let autoTimer = null;

    function goToSlide(index) {
        slides.forEach((s, idx) => {
            s.classList.toggle('active', idx === index);
        });
        dots.forEach((d, idx) => {
            d.classList.toggle('active', idx === index);
        });
        currentIndex = index;
    }

    function nextSlide() {
        let nextIdx = (currentIndex + 1) % slides.length;
        goToSlide(nextIdx);
    }

    function prevSlide() {
        let prevIdx = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIdx);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); restartTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); restartTimer(); });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            goToSlide(idx);
            restartTimer();
        });
    });

    function startTimer() {
        autoTimer = setInterval(nextSlide, 4500);
    }

    function restartTimer() {
        clearInterval(autoTimer);
        startTimer();
    }

    startTimer();
}

/* PRODUCT CARD SOLAR SLIDESHOW */
function initProductSlideshow() {
    const container = document.getElementById('solar-product-slideshow');
    if (!container) return;

    const slides = container.querySelectorAll('.product-slide');
    const dots = container.querySelectorAll('.product-dot');
    if (!slides.length) return;

    let currentIdx = 0;
    
    function showSlide(index) {
        slides.forEach((s, idx) => s.classList.toggle('active', idx === index));
        dots.forEach((d, idx) => d.classList.toggle('active', idx === index));
        currentIdx = index;
    }

    function nextSlide() {
        let nextIdx = (currentIdx + 1) % slides.length;
        showSlide(nextIdx);
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => showSlide(idx));
    });

    setInterval(nextSlide, 3500);
}
