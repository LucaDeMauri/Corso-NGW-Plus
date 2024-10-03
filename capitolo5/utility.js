/* se il commento della funzione sembra troppo bello è perché
   Ho installato un estensione che permette di generare automaticamente
   i commenti delle funzioni.*/
/**
 * @description Calcola la somma di tutti gli elementi di una lista
 * @param {number[]} lista - Lista di numeri da sommare
 * @returns {number} La somma di tutti gli elementi della lista
 */
function sommalista(lista) {
    let risultato = 0;
    for (let i = 0; i < lista.length; i++) {
        risultato += lista[i];
    }
    return risultato
}