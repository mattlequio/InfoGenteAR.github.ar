// ============================================
// ⚙️ PUNTO DE CAMBIO DEL GRÁFICO 1  [GRAFICO_1]
// ============================================
// Decisión pendiente (reunión con la profesora y la compañera):
//   modo: "original"      → muestra las imágenes originales (lista de abajo)
//   modo: "personalizado" → versión propia con los datos del contenido
//                           (todavía sin diseñar: muestra un espacio reservado)
// Para agregar las imágenes: copiarlas a una carpeta "img/" y sumarlas a la lista.
// Si hay más de una, aparecen botones para pasar de una a otra.

const GRAFICO_1 = {
  modo: "original",
  imagenes: [
    // { src: "img/grafico1-a.png", alt: "Descripción de lo que muestra el gráfico", pie: "Fuente: ..." },
  ]
};


// ============================================
// CONFIGURACIÓN INICIAL
// ============================================

// Indicamos que JavaScript está funcionando (activa los estilos animados).
document.body.classList.add("js-enabled");

// Registramos ScrollTrigger para poder usarlo con GSAP.
gsap.registerPlugin(ScrollTrigger);

// ¿La persona pidió menos movimiento en su sistema operativo?
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;


// ============================================
// BARRA DE PROGRESO DE LECTURA
// ============================================

const progressBar = document.getElementById("progressBar");

function updateProgress() {
  if (!progressBar) return;

  const scrollTop = window.scrollY;
  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();


// ============================================
// ENCABEZADO: CAPÍTULO ACTUAL Y COLOR SEGÚN EL FONDO
// ============================================

const topbar = document.getElementById("topbar");
const chapterLabel = document.getElementById("chapterLabel");

document.querySelectorAll("[data-chapter]").forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    // La sección "manda" cuando cruza la parte superior de la pantalla.
    start: "top 60px",
    end: "bottom 60px",
    onToggle: (self) => {
      if (!self.isActive) return;
      topbar.classList.toggle("on-dark", section.dataset.tone === "dark");
      chapterLabel.textContent = section.dataset.chapter;
    }
  });
});


// ============================================
// APARICIÓN DE ELEMENTOS AL HACER SCROLL
// ============================================

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});


// ============================================
// PORTADA: PARALLAX AL SALIR
// ============================================
// Mientras la portada sale de la pantalla, el texto sube y se
// desvanece, y los círculos se agrandan como si nos "metiéramos" en ellos.

if (!reduceMotion) {
  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true // la animación sigue al scroll, hacia adelante y atrás
    }
  });

  heroTl
    .to(".hero-text > *", { y: -90, opacity: 0, stagger: 0.05, ease: "none" }, 0)
    .to(".art-orbit", { scale: 1.7, rotation: 25, ease: "none" }, 0)
    .to(".art-grid", { yPercent: 12, ease: "none" }, 0);
}


// ============================================
// GRÁFICOS CON SCROLLYTELLING
// ============================================
// Cada sección .scrolly tiene un gráfico fijo y una lista de pasos.
// Cuando un paso llega al centro de la pantalla, el gráfico cambia:
//   - las barras con data-step <= paso actual se "encienden"
//   - la barra con data-step == paso actual queda destacada

// Formatea los números al estilo argentino (60.679 · 10,1%).
// "decimals" respeta la cifra tal como está en el contenido (10% ≠ 10,0%).
function formatValue(value, format, decimals = 0) {
  if (format === "percent") {
    return value.toLocaleString("es-AR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }) + "%";
  }
  return Math.round(value).toLocaleString("es-AR");
}

// Cantidad de decimales escrita en data-value ("10.1" → 1, "10" → 0).
function countDecimals(raw) {
  const part = String(raw).split(".")[1];
  return part ? part.length : 0;
}

document.querySelectorAll(".scrolly").forEach((section) => {
  const chart = section.querySelector(".bar-chart");
  const rows = Array.from(chart.querySelectorAll(".bar-row"));
  const steps = section.querySelectorAll(".step");
  const format = chart.dataset.format;

  // Calculamos el ancho de cada barra respecto del valor más alto.
  const values = rows.map((row) =>
    Number(row.querySelector(".bar-fill").dataset.value) || 0
  );
  const maxValue = Math.max(...values);

  // Preparamos cada fila: barra vacía y contador en cero.
  const rowData = rows.map((row, i) => {
    const valueEl = row.querySelector(".bar-value");
    const fill = row.querySelector(".bar-fill");
    const decimals = countDecimals(fill.dataset.value);
    const counter = { value: 0 };
    valueEl.textContent = formatValue(0, format, decimals);

    return {
      row,
      fill,
      decimals,
      valueEl,
      counter,
      value: values[i],
      percent: maxValue > 0 ? (values[i] / maxValue) * 100 : 0,
      step: Number(row.dataset.step)
    };
  });

  // Aplica el estado del gráfico para un número de paso.
  function setStep(stepIndex) {
    let hasFocus = false;

    rowData.forEach((d) => {
      const isOn = stepIndex >= d.step;
      const isFocus = stepIndex === d.step;
      if (isFocus) hasFocus = true;

      d.row.classList.toggle("is-on", isOn);
      d.row.classList.toggle("is-focus", isFocus);
      d.fill.style.width = isOn ? `${d.percent}%` : "0%";

      // El número "cuenta" hasta su valor (o vuelve a cero).
      gsap.to(d.counter, {
        value: isOn ? d.value : 0,
        duration: reduceMotion ? 0 : 1.2,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => {
          d.valueEl.textContent = formatValue(d.counter.value, format, d.decimals);
        }
      });
    });

    chart.classList.toggle("has-focus", hasFocus);

    steps.forEach((step, i) => {
      step.classList.toggle("is-active", i === stepIndex);
    });
  }

  // Un disparador por paso: se activa cuando el paso cruza el
  // centro de la pantalla, tanto bajando como subiendo.
  steps.forEach((step, i) => {
    ScrollTrigger.create({
      trigger: step,
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => {
        if (self.isActive) setStep(i);
      }
    });
  });

  setStep(0);
});


// ============================================
// TEXTO PUENTE: PALABRAS QUE SE ENCIENDEN
// ============================================
// Separamos el texto en palabras (respetando el <em> y el <br>)
// y las vamos iluminando mientras la sección queda fija en pantalla.

function splitWords(element) {
  Array.from(element.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (part.trim() === "") {
          fragment.appendChild(document.createTextNode(part));
        } else {
          const span = document.createElement("span");
          span.className = "word";
          span.textContent = part;
          fragment.appendChild(span);
        }
      });
      node.replaceWith(fragment);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      splitWords(node); // por ejemplo, el texto dentro de <em>
    }
  });
}

const bridgeText = document.getElementById("bridgeText");

if (bridgeText && !reduceMotion) {
  splitWords(bridgeText);

  gsap.timeline({
    scrollTrigger: {
      trigger: ".bridge",
      start: "top top",
      end: "+=120%",  // cuánto scroll dura la sección fija
      pin: true,      // la sección queda quieta mientras se anima
      scrub: true,
      // Se calcula primero: el espacio que agrega el "pin" corre hacia
      // abajo a las secciones siguientes (género y conclusión).
      refreshPriority: 1
    }
  })
    .to(".bridge .word", { opacity: 1, stagger: 0.1, ease: "none" })
    .from(".bridge-rule", { scaleX: 0, transformOrigin: "left", ease: "none" }, ">-0.3");
}


// ============================================
// GRÁFICO 1: IMÁGENES ORIGINALES O VERSIÓN PERSONALIZADA
// ============================================
// Mientras no haya imágenes, queda el espacio reservado del HTML.

function renderGrafico1() {
  const stage = document.getElementById("grafico1");
  if (!stage) return;

  if (GRAFICO_1.modo === "personalizado") {
    stage.innerHTML = `
      <div class="chart-placeholder">
        <span class="ph-code">[GRAFICO_1 · PERSONALIZADO]</span>
        <span>Versión personalizada con los datos del contenido.</span>
        <span class="ph-small">Pendiente de diseño.</span>
      </div>`;
    return;
  }

  const imgs = GRAFICO_1.imagenes;
  if (!imgs.length) return; // espacio reservado del HTML

  stage.innerHTML = "";

  // Botones para alternar entre imágenes (solo si hay más de una)
  let tabs = null;
  if (imgs.length > 1) {
    tabs = document.createElement("div");
    tabs.className = "g1-tabs";
    tabs.setAttribute("role", "tablist");
    stage.appendChild(tabs);
  }

  const figure = document.createElement("figure");
  figure.className = "g1-figure";
  figure.innerHTML = `<img src="" alt=""><figcaption></figcaption>`;
  stage.appendChild(figure);

  const img = figure.querySelector("img");
  const caption = figure.querySelector("figcaption");

  function show(i) {
    const data = imgs[i];
    const swap = () => {
      img.src = data.src;
      img.alt = data.alt || "";
      caption.textContent = data.pie || "";
      caption.hidden = !data.pie;
    };

    if (reduceMotion || !img.getAttribute("src")) {
      swap();
    } else {
      gsap.to(img, {
        opacity: 0, duration: 0.25,
        onComplete: () => { swap(); gsap.to(img, { opacity: 1, duration: 0.35 }); }
      });
    }

    if (tabs) {
      tabs.querySelectorAll("button").forEach((b, j) =>
        b.setAttribute("aria-selected", String(j === i))
      );
    }
  }

  if (tabs) {
    imgs.forEach((data, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.textContent = `IMAGEN ${i + 1}`;
      b.addEventListener("click", () => show(i));
      tabs.appendChild(b);
    });
  }

  show(0);
}

renderGrafico1();


// ============================================
// RECLAMOS DE LA DIVERSIDAD: EL VIDEO ACOMPAÑA EL SCROLL
// ============================================
// El short queda fijo al costado; cada eje que pasa se destaca
// y debajo del video se marca en cuál vamos.

const vsteps = document.querySelectorAll(".vstep");
const phoneDots = document.querySelectorAll(".phone-dots i");
const phoneLabel = document.getElementById("phoneLabel");

function setVStep(index) {
  vsteps.forEach((step, i) => step.classList.toggle("is-active", i === index));
  phoneDots.forEach((dot, i) => dot.classList.toggle("on", i <= index));
  if (phoneLabel) phoneLabel.textContent = vsteps[index].dataset.label;
}

vsteps.forEach((step, i) => {
  ScrollTrigger.create({
    trigger: step,
    start: "top 60%",
    end: "bottom 60%",
    onToggle: (self) => {
      if (self.isActive) setVStep(i);
    }
  });
});

if (vsteps.length) setVStep(0);


// ============================================
// AJUSTE FINAL
// ============================================
// Las fuentes de Google cambian el alto de los textos al cargar;
// recalculamos las posiciones para que los disparadores sean exactos.

document.fonts.ready.then(() => ScrollTrigger.refresh());
