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
    // ARRAY DE OBJETOS: DATOS DE STACK
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
        id: 'javascript',
        nombre: 'JavaScript ',
        tag: 'WEB/SCRIPTING',
        descripcion: 'Lenguaje fundamental para desarrollo web. Dominio de sintaxis moderna ES6+, manejo asíncrono (Promises, async/await, Fetch API), manipulación del DOM y consumo dinámico de APIs RESTful.'
      },
      {
        id: 'frontend',
        nombre: 'React & Vue.js',
        tag: 'FRONTEND',
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
    // SECCIÓN PROYECTOS (ESTADO Y DATOS)
    // =========================================
    const proyectos = [
      {
        id: 'proyecto-1',
        numero: 'PRJ_01',
        nombre: 'Gestor Resi',
        categoria: 'FULL STACK',
        subtitulo: 'Plataforma integral de gestión sociosanitaria',
        descripcion: 'Plataforma web diseñada a partir de mi experiencia previa en el sector sanitario para digitalizar la operativa integral de un centro residencial. Cuenta con arquitectura desacoplada: backend robusto en Java con Spring Boot para la lógica de negocio, control de acceso basado en roles (RBAC) y persistencia relacional. Permite la administración de expedientes de residentes, asignación de personal, control estricto de pautas de medicación y registro de partes diarios de enfermería, asegurando la trazabilidad clínica y operativa.',
        stack: ['Java', 'Spring Boot','Spring Security', 'MySQL', 'Javascript', 'Bootstrap'],
        imagen: './images/gestorREsi.png',
        demoUrl: 'https://gestion-resi.onrender.com/',
        githubBack: 'https://github.com/AdriMartin93/gestion-residencia',  // <-- Repo Java/Spring
        githubFront: 'https://github.com/AdriMartin93/gestion-resi-front' // <-- Repo Javascript
      },
      {
        id: 'proyecto-2',
        numero: 'PRJ_02',
        nombre: 'Omnitrack',
        categoria: 'FULL STACK',
        subtitulo: 'Proyecto en desarrollo, sin demo disponible aún',
        descripcion: 'Plataforma integral para centralizar y calendarizar el seguimiento de series, películas, videojuegos, manga y anime. Permite a los usuarios organizar su actividad, recibir alertas y cuentas atrás para próximos estrenos, y participar en una comunidad compartiendo listas y reseñas. A nivel técnico, el sistema se divide en microservicios independientes construidos con Spring Boot y Spring Cloud, aplicando Arquitectura Hexagonal para desacoplar las reglas de negocio de la infraestructura. Combina MySQL y MongoDB según la naturaleza de cada dato, con una hoja de ruta orientada a eventos mediante Apache Kafka para soportar alta concurrencia.',
        stack: ['Java', 'Springboot', 'Spring Cloud', 'Spring Security','MySQL', 'MongoDB', 'Javascript'],
        imagen: './images/noFoto.png',
        demoUrl: null, 
        githubBack: 'https://github.com/AdriMartin93/omnitrack',
        githubFront: null 
      }
    ];

    const proyectoActivoId = ref(proyectos[0].id);

    const proyectoSeleccionado = computed(() => {
      return proyectos.find(p => p.id === proyectoActivoId.value) || proyectos[0];
    });

    function seleccionarProyecto(id) {
      if (proyectoActivoId.value !== id) {
        proyectoActivoId.value = id;
        reproducirSonidoClick();
      }
    }

    // =========================================
    // SECCIÓN CONTACTO Y ENVÍO REAL (FORMSPREE)
    // =========================================
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mkjgkgdj';

    const emailContacto = ref('adrianma1993@gmail.com'); 
    const emailCopiado = ref(false);

    function copiarEmail() {
      navigator.clipboard.writeText(emailContacto.value).then(() => {
        emailCopiado.value = true;
        reproducirSonidoClick();
        setTimeout(() => {
          emailCopiado.value = false;
        }, 2500);
      });
    }

    const formulario = ref({
      nombre: '',
      email: '',
      asunto: 'Propuesta laboral',
      mensaje: ''
    });

    const enviando = ref(false);
    const mensajeEnviado = ref(false);
    const errorEnvio = ref(false);

    async function enviarFormulario() {
      enviando.value = true;
      mensajeEnviado.value = false;
      errorEnvio.value = false;
      reproducirSonidoClick();

      try {
        const respuesta = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formulario.value.nombre,
            email: formulario.value.email,
            subject: formulario.value.asunto,
            message: formulario.value.mensaje
          })
        });

        if (respuesta.ok) {
          mensajeEnviado.value = true;
          formulario.value = {
            nombre: '',
            email: '',
            asunto: 'Propuesta laboral',
            mensaje: ''
          };
          setTimeout(() => {
            mensajeEnviado.value = false;
          }, 7000);
        } else {
          errorEnvio.value = true;
        }
      } catch (err) {
        console.error('Error al enviar correo:', err);
        errorEnvio.value = true;
      } finally {
        enviando.value = false;
      }
    }

    // =========================================
    // SÍNTESIS DE AUDIO (Web Audio API)
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
    // CAMBIO DE PESTAÑAS Y SCROLL
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
      const elementoScrollable = e.target.closest('.panel-body');

      if (elementoScrollable) {
        const { scrollTop, scrollHeight, clientHeight } = elementoScrollable;
        const puedeBajar = scrollTop + clientHeight < scrollHeight - 3;
        const puedeSubir = scrollTop > 3;

        if (e.deltaY > 0 && puedeBajar) {
          return;
        }

        if (e.deltaY < 0 && puedeSubir) {
          return;
        }
      }

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
    // EL RETURN: AQUÍ SE COMPARTE TODO CON EL HTML
    // ==========================================================
    return {
      seccionActiva,
      indiceActivo,
      tituloActual,
      kanjiActual,
      cambiarSeccion,
      tecnologias,        
      stackSeleccionado,  
      toggleStack,        
      emailContacto,
      emailCopiado,
      copiarEmail,
      formulario,
      enviando,
      mensajeEnviado,
      errorEnvio,
      enviarFormulario,
      proyectos,
      proyectoActivoId,
      proyectoSeleccionado,
      seleccionarProyecto
    };
  }
}).mount('#app');