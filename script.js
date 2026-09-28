const { createApp, ref, computed, onMounted } = Vue;

createApp({
  setup() {
    // 1. Identificadores de las 4 secciones principales
    const secciones = ['sobre-mi', 'stack', 'proyectos', 'contacto'];
    const seccionActiva = ref('sobre-mi');

    const titulos = {
      'sobre-mi': 'SOBRE MÍ',
      'stack': 'STACK TECNOLÓGICO',
      'proyectos': 'PROYECTOS',
      'contacto': 'CONTÁCTAME'
    };

    const subtitulosIngles = {
      'sobre-mi': 'About me - 01',
      'stack': 'Technology stack - 02',
      'proyectos': 'Projects - 03',
      'contacto': 'Contact me - 04'
    };

    const tituloActual = computed(() => titulos[seccionActiva.value] || 'MENÚ');
    const kanjiActual = computed(() => subtitulosIngles[seccionActiva.value] || '');
    const indiceActivo = computed(() => secciones.indexOf(seccionActiva.value));

    // =========================================
    // 2. ARRAY DE OBJETOS: DATOS DE TU STACK
    // =========================================
    const tecnologias = [
      {
        id: 'java',
        nombre: 'Java (17 / 21)',
        tag: 'CORE BACKEND',
        descripcion: 'Lenguaje principal y pilar de mi perfil técnico, siendo la tecnología con la que me formé. Sólido dominio de Programación Orientada a Objetos (POO), colecciones, streams y buenas prácticas para la creación de código limpio, robusto y altamente mantenible.'
      },
      {
        id: 'spring',
        nombre: 'Spring Boot & Spring Cloud',
        tag: 'FRAMEWORK / MICROSERVICIOS',
        descripcion: 'Framework de referencia en mi día a día. Experiencia en el diseño de microservicios e integración con Spring Cloud (Service Discovery, API Gateway). Aplicación de patrones de arquitectura como Domain-Driven Design (DDD) y Arquitectura Hexagonal para desacoplar la lógica de negocio.'
      },
      {
        id: 'db',
        nombre: 'MySQL, PostgreSQL & MongoDB',
        tag: 'PERSISTENCIA / DATABASES',
        descripcion: 'Manejo fluido de bases de datos relacionales (MySQL, PostgreSQL) en diseño de esquemas, normalización y optimización de consultas SQL junto a JPA/Hibernate. Además, cuento con bases de datos NoSQL con MongoDB, tecnología que implemento en mi próximo desarrollo.'
      },
      {
        id: 'devops',
        nombre: 'Git & Docker',
        tag: 'CONTROL & DEPLOY',
        descripcion: 'Gestión y control de versiones mediante Git y GitHub para flujo de trabajo colaborativo. Uso práctico de Docker enfocado en contenerización de aplicaciones backend para facilitar su despliegue y puesta en marcha en servidores y entornos cloud.'
      },
      {
        id: 'frontend',
        nombre: 'JavaScript, React & Vue.js',
        tag: 'FRONTEND SPA',
        descripcion: 'Capacidad para construir y conectar interfaces interactivas para complementar el backend. Experiencia desarrollando el frontend del proyecto final de DAW con React y creación de interfaces dinámicas y modulares con Vue.js 3.'
      },
      {
        id: 'ui-skills',
        nombre: 'HTML5, CSS3 & AI Workflows',
        tag: 'ENFOQUE BACKEND-FIRST',
        descripcion: 'Perfil centrado en lógica de servidor, arquitectura y datos. Comprensión sólida de la estructura web (HTML/CSS) combinada con flujos de trabajo asistidos por IA para maquetación ágil, resolviendo interfaces completas de forma eficiente.'
      }
    ];

    // Guarda el 'id' de la tarjeta que esté abierta (null = ninguna abierta)
    const stackSeleccionado = ref(null);

    // Función para abrir o cerrar al hacer clic
    function toggleStack(id) {
      if (stackSeleccionado.value === id) {
        stackSeleccionado.value = null; // Si ya estaba abierta, se cierra
      } else {
        stackSeleccionado.value = id;   // Se abre la nueva
      }
      reproducirSonidoClick();
    }

    // =========================================
    // 3. SÍNTESIS DE AUDIO (Web Audio API)
    // =========================================
    let audioCtx = null;

    function getAudioContext() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      return audioCtx;
    }

    function despertarAudio() {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    }

    async function reproducirSonidoClick() {
      try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(1174.66, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760.00, ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch (e) {}
    }

    // =========================================
    // 4. CAMBIO DE PESTAÑAS Y SCROLL
    // =========================================
    function cambiarSeccion(nombreSeccion) {
      if (seccionActiva.value !== nombreSeccion) {
        seccionActiva.value = nombreSeccion;
        reproducirSonidoClick();
      }
    }

    let scrollBloqueado = false;

    function manejarScroll(e) {
      despertarAudio();
      if (scrollBloqueado) return;

      const idxActual = secciones.indexOf(seccionActiva.value);

      if (e.deltaY > 20) {
        if (idxActual < secciones.length - 1) {
          cambiarSeccion(secciones[idxActual + 1]);
          bloquearScrollTemporalmente();
        }
      } else if (e.deltaY < -20) {
        if (idxActual > 0) {
          cambiarSeccion(secciones[idxActual - 1]);
          bloquearScrollTemporalmente();
        }
      }
    }

    function bloquearScrollTemporalmente() {
      scrollBloqueado = true;
      setTimeout(() => {
        scrollBloqueado = false;
      }, 420);
    }

    onMounted(() => {
      window.addEventListener('wheel', manejarScroll, { passive: true });
      window.addEventListener('pointermove', despertarAudio, { once: true });
      window.addEventListener('pointerdown', despertarAudio, { once: true });
      window.addEventListener('keydown', despertarAudio, { once: true });
    });

    // ==========================================================
    // 5. EL RETURN: AQUÍ SE COMPARTE TODO CON EL HTML
    // ==========================================================
    return {
      seccionActiva,
      indiceActivo,
      tituloActual,
      kanjiActual,
      cambiarSeccion,
      tecnologias,        // Lista de tecnologías visible en el HTML
      stackSeleccionado,  // Variable que guarda cuál está abierta
      toggleStack         // Función que se ejecuta con @click en el HTML
    };
  }
}).mount('#app');