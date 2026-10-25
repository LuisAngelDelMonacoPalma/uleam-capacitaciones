/* Cargador de vistas parciales.
   Reemplaza cada <div data-include="ruta.html"> por el contenido de ese archivo,
   conservando el orden original del documento. Requiere servir el proyecto por HTTP
   (Live Server, `python -m http.server`, etc.), porque fetch() no funciona con file://. */

async function loadPartials() {
    const slots = Array.from(document.querySelectorAll('[data-include]'));

    await Promise.all(slots.map(async slot => {
        const url = slot.getAttribute('data-include');
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo cargar "${url}" (HTTP ${response.status})`);
        }
        slot.outerHTML = await response.text();
    }));
}

function showLoadError(err) {
    console.error(err);
    const isFile = window.location.protocol === 'file:';
    const hint = isFile
        ? 'Estás abriendo la página con file://. El navegador bloquea la carga de las vistas en ese modo. Sirve la carpeta con un servidor local (extensión Live Server de VS Code, o ejecuta <code>python -m http.server 8000</code> dentro de la carpeta y abre <code>http://localhost:8000</code>).'
        : 'Revisa que todos los archivos de las carpetas shared/, student/, instructor/ y admin/ existan en las rutas indicadas en index.html.';

    document.body.innerHTML = `
        <div style="max-width:560px;margin:10vh auto;padding:24px;font-family:sans-serif;border:1px solid #C62828;border-radius:12px;background:#fff">
            <h2 style="color:#C62828;margin:0 0 8px">No se pudo iniciar la plataforma</h2>
            <p style="font-size:14px;color:#444;margin:0 0 8px">${err.message}</p>
            <p style="font-size:13px;color:#666;margin:0">${hint}</p>
        </div>
    `;
}
