/*
 *  Application helper
 */
import * as _ from 'lodash';

module.exports = {

    /**
     * @param id --> id klienta
     * @param arr --> tablica obiektów
     * @returns obiekt z danymi potrzebnego klienta
     */
    getClient: function (id, arr) {
        let clientId = parseInt(id);
        return _.find(arr, { 'id': clientId });
    },
    
    /**
     * @param id --> id pracownika
     * @param arr --> tablica obiektów
     * @returns obiekt z danymi potrzebnego pracownika
     */
    getEmployee: function (id, arr) {
        let employeeId = parseInt(id);
        return _.find(arr, { 'id': employeeId });
    }
};