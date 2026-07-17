document.addEventListener('DOMContentLoaded', () => {
  
  // ----------------------------------------------------
  // 1. SCROLL EFFECT: PROGRESS BAR & REVEAL ANIMATIONS
  // ----------------------------------------------------
  const progressBar = document.getElementById('page-progress');
  const revealElements = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('#main-nav a, #side-dots .dot-item');
  const sections = document.querySelectorAll('section');
  const timelineProgress = document.getElementById('timeline-scroll-progress');
  const timelineSection = document.getElementById('timeline');
  const timelineItems = document.querySelectorAll('.timeline-item');

  function handleScroll() {
    // Top scroll progress bar
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal > 0) {
      const scrollPercent = (window.scrollY / scrollTotal) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Timeline scroll vertical progress filling
    if (timelineSection && timelineProgress) {
      const rect = timelineSection.getBoundingClientRect();
      const sectionHeight = rect.height;
      const sectionTop = rect.top;
      
      // Calculate how far we've scrolled inside the timeline section
      const triggerStart = window.innerHeight * 0.7; // start filling when section is 70% from top
      const scrollPosition = triggerStart - sectionTop;
      
      let progressPercent = 0;
      if (scrollPosition > 0) {
        progressPercent = (scrollPosition / (sectionHeight - window.innerHeight * 0.3)) * 100;
      }
      
      progressPercent = Math.min(Math.max(progressPercent, 0), 100);
      timelineProgress.style.height = `${progressPercent}%`;

      // Activate timeline nodes based on scroll depth
      timelineItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < window.innerHeight * 0.6) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // Active Section Tracking for Nav Highlight
    let currentSectionId = 'cover';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        currentSectionId = section.getAttribute('id');
      }
    });

    // Update nav links active class
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Reveal Elements on Entry via IntersectionObserver
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial run

  // ----------------------------------------------------
  // 2. FUTURE SECTION: TABS INTERACTIVE CONTROL
  // ----------------------------------------------------
  const tabButtons = document.querySelectorAll('#future-tabs .tab-btn');
  const tabPanels = document.querySelectorAll('#future-panels .tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update Active Tab Button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update Active Panel
      tabPanels.forEach(panel => {
        if (panel.getAttribute('id') === targetTab) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // ----------------------------------------------------
  // 3. PRESENT SECTION: INTERACTIVE CARDS & MODAL
  // ----------------------------------------------------
  const presentCards = document.querySelectorAll('.present-card');
  const sectorModal = document.getElementById('sector-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalIconContainer = document.getElementById('modal-icon-container');
  const modalTitleText = document.getElementById('modal-title-text');
  const modalBodyContent = document.getElementById('modal-body-content');

  // Sectors information repository
  const sectorDetails = {
    medicina: {
      title: "Medicina y Odontología",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
             </svg>`,
      body: `
        <p><strong>Estado Actual:</strong> La manufactura aditiva ha revolucionado los tratamientos clínicos mediante la hiper-personalización anatómica de componentes biocompatibles.</p>
        <p><strong>Prótesis de Bajo Costo:</strong> Dispositivos prostéticos altamente funcionales impresos en polímeros resistentes que reducen los costos hasta en un 90%, abriendo el acceso en comunidades de bajos recursos.</p>
        <p><strong>Alineadores Invisibles:</strong> La ortodoncia digital escanea directamente la dentadura y produce moldes impresos en 3D secuenciales para termoformar alineadores en horas, erradicando los moldes de yeso tradicionales.</p>
        <p><strong>Implantes de Titanio Porosos:</strong> Piezas óseas y craneales impresas mediante sinterizado láser de titanio. La estructura de porosidad controlada permite el crecimiento celular óseo nativo (osteointegración) directamente en el implante, eliminando fallas mecánicas a largo plazo.</p>
      `
    },
    aeroespacial: {
      title: "Industria Aeroespacial",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
             </svg>`,
      body: `
        <p><strong>Estado Actual:</strong> La aviación comercial y espacial utiliza la impresión 3D para fundir aleaciones de supermetales (como Inconel) en formas que antes eran imposibles de forjar.</p>
        <p><strong>Canales de Refrigeración Curvos:</strong> Los inyectores y componentes internos de turbinas incorporan ductos de enfriamiento de geometría orgánica y espiral. Esto disipa el calor con máxima eficiencia y eleva el rendimiento termodinámico del motor.</p>
        <p><strong>Reducción de Peso y Consolidación:</strong> Componentes que antes constaban de 50 a 100 piezas individuales ensambladas mediante tornillos y soldaduras ahora se imprimen como una sola pieza monolítica. Esto elimina puntos de falla críticos y reduce el peso estructural de forma drástica, ahorrando toneladas de combustible.</p>
      `
    },
    construccion: {
      title: "Arquitectura y Construcción",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
             </svg>`,
      body: `
        <p><strong>Estado Actual:</strong> La impresión 3D a macroescala emplea brazos robóticos y pórticos industriales para extruir mezclas cementosas de fraguado rápido y alta resistencia en sitio.</p>
        <p><strong>Viviendas y Muros Estructurales:</strong> Impresión de muros portantes de doble capa sin encofrados (moldes de madera o metal), depositando concreto capa por capa en base a planos paramétricos tridimensionales.</p>
        <p><strong>Eficiencia Material y Temporal:</strong> Permite construir el armazón de viviendas familiares en cuestión de días (menos de 72 horas operativas). Reduce los residuos de obra en un 60% y optimiza el consumo de materiales al rellenar selectivamente solo los conductos estructurales necesarios.</p>
      `
    },
    maker: {
      title: "Sector Doméstico y Maker",
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
             </svg>`,
      body: `
        <p><strong>Estado Actual:</strong> Las impresoras 3D domésticas (FDM de filamento y SLA de resina asequible) han descentralizado el diseño, permitiendo a diseñadores y aficionados fabricar directamente en sus hogares.</p>
        <p><strong>Filosofía del Derecho a Reparar:</strong> En lugar de desechar electrodomésticos enteros debido a una sola pieza rota, los usuarios descargan modelos de planos libres en repositorios digitales de la comunidad y fabrican engranajes, perillas o carcasas de repuesto.</p>
        <p><strong>Comunidad Global Abierta:</strong> Intercambio libre de repositorios de diseño que impulsan una economía descentralizada y empoderan al consumidor frente a la obsolescencia programada y los monopolios logísticos tradicionales.</p>
      `
    }
  };

  function openModal(sectorKey) {
    const data = sectorDetails[sectorKey];
    if (!data) return;

    modalIconContainer.innerHTML = data.icon;
    modalTitleText.textContent = data.title;
    modalBodyContent.innerHTML = data.body;
    
    sectorModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeModal() {
    sectorModal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
  }

  presentCards.forEach(card => {
    card.addEventListener('click', () => {
      const sector = card.getAttribute('data-sector');
      openModal(sector);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);
  sectorModal.addEventListener('click', (e) => {
    if (e.target === sectorModal) closeModal();
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sectorModal.classList.contains('active')) {
      closeModal();
    }
  });

  // ----------------------------------------------------
  // 4. PREMIUM INTERACTIVE: 3D PRINTER SIMULATOR LOGIC
  // ----------------------------------------------------
  const simToggleBtn = document.getElementById('sim-toggle-btn');
  const simPanel = document.getElementById('sim-panel');
  const simCloseBtn = document.getElementById('sim-close-btn');
  
  const simShapeSelect = document.getElementById('sim-shape-select');
  const simPrintBtn = document.getElementById('sim-print-btn');
  const simStatusText = document.getElementById('sim-status-text');
  
  const nozzleHead = document.getElementById('nozzle-head');
  const nozzleBeam = document.getElementById('nozzle-beam');
  const printingSvg = document.getElementById('printing-svg');
  const simBed = document.querySelector('.sim-bed');

  // Toggle open/close simulator panel
  simToggleBtn.addEventListener('click', () => {
    simPanel.classList.toggle('active');
  });

  simCloseBtn.addEventListener('click', () => {
    simPanel.classList.remove('active');
  });

  // Setup list of printable shapes
  const shapes = {
    gear: document.getElementById('svg-shape-gear'),
    house: document.getElementById('svg-shape-house'),
    heart: document.getElementById('svg-shape-heart'),
    atom: document.getElementById('svg-shape-atom')
  };

  // Keep track of active animation frame to cancel if shape changes mid-print
  let activeAnimationId = null;

  function resetSimulator() {
    if (activeAnimationId) {
      cancelAnimationFrame(activeAnimationId);
      activeAnimationId = null;
    }
    
    // Hide nozzle parts
    nozzleHead.style.display = 'none';
    nozzleBeam.style.display = 'none';
    
    // Hide all paths and reset stroke offset
    Object.values(shapes).forEach(path => {
      path.style.display = 'none';
      path.style.strokeDashoffset = '1000';
    });

    simPrintBtn.disabled = false;
    simShapeSelect.disabled = false;
    simStatusText.textContent = "Listo para imprimir";
  }

  simShapeSelect.addEventListener('change', resetSimulator);

  function startPrinting() {
    const selectedKey = simShapeSelect.value;
    const activePath = shapes[selectedKey];

    if (!activePath) return;

    // Reset everything first
    resetSimulator();

    // Disable controls during printing
    simPrintBtn.disabled = true;
    simShapeSelect.disabled = true;
    simStatusText.textContent = "Calentando boquilla (210°C)...";

    // Setup visual paths
    activePath.style.display = 'block';
    const totalLength = activePath.getTotalLength();
    
    // Set dash array to total length so we can reveal it slowly
    activePath.style.strokeDasharray = `${totalLength} ${totalLength}`;
    activePath.style.strokeDashoffset = totalLength;

    // Show nozzle
    nozzleHead.style.display = 'block';
    nozzleBeam.style.display = 'block';

    // Get Bounding calculations for placing the nozzle correctly over the path
    const svgRect = printingSvg.getBoundingClientRect();
    const bedRect = simBed.getBoundingClientRect();
    
    const scaleX = svgRect.width / 100;
    const scaleY = svgRect.height / 100;
    const offsetX = svgRect.left - bedRect.left;
    const offsetY = svgRect.top - bedRect.top;

    const startTime = performance.now();
    const printDuration = 4000; // 4 seconds total print time

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      let progress = elapsed / printDuration;
      
      if (progress > 1) progress = 1;

      // Update nozzle temperature and status message dynamically
      if (progress < 0.1) {
        simStatusText.textContent = "Preparando base de impresión...";
      } else if (progress < 0.95) {
        const percent = Math.floor(progress * 100);
        simStatusText.textContent = `Depositando material... ${percent}%`;
      } else {
        simStatusText.textContent = "Enfriando filamento...";
      }

      // Draw path
      const currentDrawOffset = totalLength * (1 - progress);
      activePath.style.strokeDashoffset = currentDrawOffset;

      // Move Nozzle
      const currentDistance = totalLength * progress;
      // Safeguard against out of bounds errors
      const safeDistance = Math.min(Math.max(currentDistance, 0.01), totalLength - 0.01);
      
      try {
        const pt = activePath.getPointAtLength(safeDistance);
        
        // Calculate placement coordinates relative to sim-bed container
        const nozzleX = offsetX + (pt.x * scaleX);
        const nozzleY = offsetY + (pt.y * scaleY);
        
        nozzleHead.style.left = `${nozzleX}px`;
        nozzleHead.style.top = `${nozzleY}px`;
      } catch (err) {
        // Fallback if browser throws on path coordinates
      }

      if (progress < 1) {
        activeAnimationId = requestAnimationFrame(animate);
      } else {
        // Finished Printing
        activeAnimationId = null;
        nozzleBeam.style.display = 'none';
        
        // Fade nozzle away slowly
        setTimeout(() => {
          nozzleHead.style.display = 'none';
        }, 300);

        // Flash shape effect
        activePath.style.transition = 'stroke-width 0.3s ease';
        activePath.style.strokeWidth = '4';
        
        setTimeout(() => {
          activePath.style.strokeWidth = '2';
          activePath.style.transition = 'none';
          
          simStatusText.textContent = "¡Impresión 3D finalizada!";
          simPrintBtn.disabled = false;
          simShapeSelect.disabled = false;
        }, 300);
      }
    }

    // Delayed start to simulate initial printer calibration
    setTimeout(() => {
      simStatusText.textContent = "Imprimiendo capa 1 de 1...";
      activeAnimationId = requestAnimationFrame(animate);
    }, 1000);
  }

  simPrintBtn.addEventListener('click', startPrinting);
  
  // Close simulator drawer initially if clicking outside
  document.addEventListener('click', (e) => {
    if (!simPanel.contains(e.target) && !simToggleBtn.contains(e.target) && simPanel.classList.contains('active')) {
      simPanel.classList.remove('active');
    }
  });

});
