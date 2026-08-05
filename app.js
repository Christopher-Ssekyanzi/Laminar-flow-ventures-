/* ==========================================================================
   Laminar Flow Ventures - Master Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initCalculator();
    initPortfolio();
    initModal();
    initForm();
    initSimWidget();
    updateYear();
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

/* Hydraulic & Laminar Flow Calculator Logic */
function initCalculator() {
    const qRange = document.getElementById('calc-flow-range');
    const qNum = document.getElementById('calc-flow-num');
    const dRange = document.getElementById('calc-dia-range');
    const dNum = document.getElementById('calc-dia-num');
    const lRange = document.getElementById('calc-len-range');
    const lNum = document.getElementById('calc-len-num');

    const resVelocity = document.getElementById('res-velocity');
    const resReynolds = document.getElementById('res-reynolds');
    const resRegime = document.getElementById('res-regime');
    const resHeadloss = document.getElementById('res-headloss');

    function sync(range, num) {
        range.addEventListener('input', () => {
            num.value = range.value;
            calculate();
        });
        num.addEventListener('input', () => {
            range.value = num.value;
            calculate();
        });
    }

    sync(qRange, qNum);
    sync(dRange, dNum);
    sync(lRange, lNum);

    function calculate() {
        const Q = parseFloat(qNum.value) / 1000; // convert L/s to m^3/s
        const D = parseFloat(dNum.value) / 1000; // convert mm to meters
        const L = parseFloat(lNum.value);       // meters

        if (!Q || !D || !L) return;

        // Area A = pi * (D/2)^2
        const A = Math.PI * Math.pow(D / 2, 2);
        
        // Velocity V = Q / A
        const V = Q / A;

        // Reynolds Number Re = (density * V * D) / viscosity
        // Water @ 20°C: density ≈ 998 kg/m^3, dynamic viscosity μ ≈ 0.001 Pa·s
        const Re = (998 * V * D) / 0.001002;

        // Friction factor (Darcy-Weisbach friction estimate)
        let f = (Re < 2300) ? (64 / Re) : (0.316 / Math.pow(Re, 0.25));
        if (isNaN(f) || !isFinite(f)) f = 0.02;

        // Head loss h_f = f * (L/D) * (V^2 / 2g)
        const g = 9.81;
        const hf = f * (L / D) * (Math.pow(V, 2) / (2 * g));

        // Update UI
        resVelocity.textContent = `${V.toFixed(2)} m/s`;
        resReynolds.textContent = Math.round(Re).toLocaleString();
        resHeadloss.textContent = `${hf.toFixed(2)} m`;

        if (Re < 2300) {
            resRegime.textContent = 'Laminar Flow (Optimal)';
            resRegime.className = 'status-pill laminar';
        } else if (Re < 4000) {
            resRegime.textContent = 'Transitional Flow';
            resRegime.className = 'status-pill turbulent';
            resRegime.style.borderColor = '#FFC107';
            resRegime.style.color = '#FFC107';
        } else {
            resRegime.textContent = 'Turbulent Flow';
            resRegime.className = 'status-pill turbulent';
        }
    }

    calculate();

    const requestBtn = document.getElementById('calc-request-btn');
    if (requestBtn) {
        requestBtn.addEventListener('click', () => {
            const formService = document.getElementById('form-service');
            const formMsg = document.getElementById('form-message');
            if (formService) formService.value = 'designs';
            if (formMsg) {
                formMsg.value = `Hydraulic Calculation Spec:\n- Flow Rate (Q): ${qNum.value} L/s\n- Pipe Diameter (D): ${dNum.value} mm\n- Distance (L): ${lNum.value} m\n- Velocity (V): ${resVelocity.textContent}\n- Flow State: ${resRegime.textContent}`;
            }
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
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

    const specData = {
        works: {
            title: "Water Engineering Works Specifications",
            content: `
                <div class="modal-spec-box">
                    <p class="modal-intro">Laminar Flow Ventures provides comprehensive EPC (Engineering, Procurement, and Construction) for heavy water works.</p>
                    <ul class="modal-spec-list">
                        <li><strong>Civil & Structural:</strong> Reinforced concrete reservoirs, pump foundations, intake towers, spillways.</li>
                        <li><strong>Hydraulic Mechanical:</strong> High-pressure piping assemblies (HDPE, Ductile Iron, Stainless Steel 316L).</li>
                        <li><strong>Electrical & Telemetry:</strong> Motor control centers (MCC), VFD drives, backup generators, SCADA integration.</li>
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
                        <li><strong>Pumps:</strong> Centrifugal, vertical turbine, submersible, positive displacement (0.5 to 500 L/s).</li>
                        <li><strong>Valves:</strong> Pressure reducing (PRV), air release, butterfly, non-return check valves.</li>
                        <li><strong>Smart IoT:</strong> Ultrasonic transit-time meters, wireless telemetry loggers with solar backing.</li>
                    </ul>
                </div>
            `
        }
    };

    triggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.service;
            if (specData[key]) {
                modalBody.innerHTML = `
                    <h2 class="gradient-text" style="margin-bottom: 16px;">${specData[key].title}</h2>
                    ${specData[key].content}
                    <button class="btn btn-primary" style="margin-top: 24px; width: 100%;" onclick="closeModal()">Close Details</button>
                `;
                modal.classList.add('active');
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    window.closeModal = function() {
        modal.classList.remove('active');
    };

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
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
