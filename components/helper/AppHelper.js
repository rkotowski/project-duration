/*
 *  Application helper
 */
let _ = require('lodash');

module.exports = {

    /**
     * @param id --> id klienta
     * @param arr --> tablica obiektów
     * @returns obiekt z danymi potrzebnego klienta
     */
    getClient: function (id, arr) {
        let clientId = parseInt(id);
        return _.find(arr, { 'id': clientId });
    }

    
};