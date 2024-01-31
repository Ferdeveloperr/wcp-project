// Fuera del componente UserArea.jsx
export const convertirSegundosAHorasMinutosSegundos = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segundosRestantes = segundos % 60;

    return `${horas}h ${minutos}m ${segundosRestantes}s`;
};
