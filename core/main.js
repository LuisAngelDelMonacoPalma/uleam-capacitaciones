/* Inicialización de la aplicación */
window.onload = async function() {
    try {
        await loadPartials();
    } catch (err) {
        showLoadError(err);
        return;
    }

    initStorage();
    showView('auth');
    showAuthStep('login');
};
