# Censo 2022: ¿Lo que no se mide, existe?

Página web de estilo scrollytelling para una materia universitaria en Argentina. Muestra cómo el Censo 2022 registró a los pueblos indígenas y a la diversidad sexual y de género, y qué reclamos siguen vigentes.

## Documentos del proyecto

- `CLAUDE.md`: reglas permanentes que Claude Code carga en cada sesión (datos, decisiones pendientes, criterios de diversidad, requisitos técnicos y forma de trabajo).
- `README.md`: este archivo, para uso humano.
- `criterios-diversidad.md`: pendiente. Se agregará con el material sobre lenguaje y estigmas.
- Contenido: el PDF con las descripciones de la web y las imágenes de los gráficos.

## Estado de las decisiones

- **Gráficos animados:** pendiente. Se define mañana con la profesora y la compañera. Pueden ser las imágenes originales o versiones personalizadas con los datos del contenido. La página se implementa con la versión original y un punto de cambio configurable.
- **Cifras de diversidad:** en verificación con INDEC. Los tres subgrupos (72.510 + 60.679 + 37.330 = 170.519) no suman el total de 196.956. Se muestran con la nota correspondiente.
- **Videos de YouTube:** confirmar permisos o, como mínimo, citar canal y fecha.

## Estructura de la página

1. Título: "¿Lo que no se mide, existe?"
2. Introducción, con la frase clave destacada.
3. "¿Por qué es importante el censo?": seis ítems que aparecen al scrollear.
4. Gráfico 1 animado (pendiente de decisión).
5. Poblaciones que registra el Estado: pueblos indígenas y diversidad sexual y de género.
6. "Si no se mide, se desconoce": reclamos de los pueblos indígenas.
7. Video 1.
8. Reclamos de la diversidad: trabajo, educación, salud e igualdad de trato.
9. Video 2 (short vertical).
10. Consecuencias de no aparecer en las estadísticas.
11. Conclusión y la pregunta final: "¿Alcanza con ser contado o también es necesario ser escuchado?"
12. Fuentes: INDEC, CIDH, Ministerio de las Mujeres, Géneros y Diversidad, INAI y videos de YouTube.

## Prompt inicial para Claude Code

Usar en modo plan. Claude Code debe proponer el plan y esperar aprobación antes de tocar archivos.

```
Estoy armando una página web de estilo scrollytelling para una materia universitaria. El tema es el Censo 2022 y la visibilización de los pueblos indígenas y de la diversidad sexual y de género en Argentina.

Antes de empezar, lee el archivo del contenido (PDF o contenido.md). Usa el texto y las cifras tal cual aparecen. No inventes datos, no redondees y no cambies ninguna cifra ni categoría del censo.

MODO PLAN: primero propone un plan con la lista de archivos que vas a crear o modificar y espera mi aprobación antes de tocar código.

ESTRUCTURA, EN ORDEN:
1. Título: "¿Lo que no se mide, existe?" como pregunta disparadora.
2. Introducción. La frase "Las personas y sus identidades existen independientemente de que el Estado las registre." va destacada en negrita y con color de acento.
3. "¿Por qué es importante el censo?" Lista de seis ítems que aparecen uno por uno al scrollear.
4. GRÁFICO 1 (animado, con interacción). Ubicación: después de la introducción del Censo 2022. Su contenido y diseño están pendientes de decisión. Usa un marcador [GRAFICO_1].
5. "¿Quiénes son las poblaciones que hoy registra el Estado?"
   - Pueblos indígenas: 1.306.730 personas, 2,9% de la población en viviendas particulares.
   - Provincias con mayor porcentaje: Jujuy 10,1%, Salta 10%, Chubut 7,9%, Formosa 7,8%, Neuquén 7,7%.
   - Diversidad sexual y de género: 196.956 personas (0,4% de la población censada). Desglose: 72.510 varones trans, 60.679 mujeres trans/travestis y 37.330 personas no binarias.
   - Muestra las subcategorías sin sumarlas ni presentarlas como el total completo. Agrega la nota: "Cifras en verificación con INDEC".
6. Bloque "Si no se mide, se desconoce". Compara lo que el Estado empezó a contar con los reclamos que siguen vigentes. Incluye los cuatro reclamos de los pueblos indígenas (territorio, recursos naturales, educación intercultural bilingüe, consulta previa).
7. VIDEO 1: incrustar https://www.youtube.com/watch?v=6gr1g9DZEA0 al final de ese bloque.
8. Reclamos de la diversidad: cuatro ejes (trabajo, educación, salud, igualdad de trato y reconocimiento social), con un bloque por eje.
9. VIDEO 2: incrustar https://youtube.com/shorts/rLXTfJFd2hE?si=s0uOfD4q5a_ty-3G en la sección de diversidad. Es un short vertical; ajusta el formato del embed para que no quede cortado.
10. "¿Qué ocurre cuando una identidad no aparece en las estadísticas?" Cuatro consecuencias numeradas, cada una con su animación.
11. Conclusión y la pregunta final: "¿Alcanza con ser contado o también es necesario ser escuchado?"
12. Fuentes: INDEC, CIDH, Ministerio de las Mujeres, Géneros y Diversidad, INAI y videos de YouTube.

REQUISITOS TÉCNICOS:
- Animaciones al scrollear y elementos interactivos en los gráficos.
- Todo el contenido debe poder leerse sin animación: respeta prefers-reduced-motion.
- Responsive, pensado primero para celular.
- Contraste suficiente, texto alternativo en imágenes y descripción textual de los videos.
- Usa las categorías y el lenguaje del INDEC. No cambies los nombres de las poblaciones ni agregues adjetivos.

CRITERIOS DE DIVERSIDAD:
Antes de escribir textos nuevos o modificar los existentes, revisa criterios-diversidad.md (pendiente). Hasta entonces, usa un lenguaje respetuoso y sin estigmas, y márcame cualquier frase que dudes.

DECISIONES PENDIENTES (no las resuelvas por tu cuenta):
- Si los gráficos en movimiento serán los originales (imágenes ya existentes) o versiones personalizadas con los datos de este contenido. Se define en una reunión con la profesora y la compañera.
- Implementa el gráfico con una estructura configurable, para poder cambiar entre ambas opciones sin reescribir la página. Usa la versión con imágenes originales como valor inicial y déjame marcado el punto de cambio.
```

## Fuentes

- INDEC (Censo Nacional de Población, Hogares y Viviendas 2022)
- CIDH
- Ministerio de las Mujeres, Géneros y Diversidad: encuestas y relevamientos sobre las condiciones de vida de la población LGBTI+
- INAI
- Testimonios de YouTube (pendiente de confirmar permisos y citas)