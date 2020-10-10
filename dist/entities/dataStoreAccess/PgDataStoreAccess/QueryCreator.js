"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const createSqlStringFromMap_1 = require("./createSqlStringFromMap");
class QueryCreator {
    getCreateRefQueryForPath(ref) {
        return `CREATE TABLE ${ref} ();`;
    }
    getReadWhereQuery(ref, whereFields) {
        return lodash_1.size(whereFields) > 0
            ? this
                .createReadWithWhereClause(ref, whereFields)
            : this
                .createRead(ref);
    }
    getUpdateWhereQuery(ref, updateData, whereFields) {
        const updateComparison = this.createComparsonStringFromMap(updateData, ',');
        const whereComparison = this.createComparsonStringFromMap(whereFields, 'AND');
        return `UPDATE ${ref} SET ${updateComparison} WHERE ${whereComparison};`;
    }
    getDeleteWhereQuery(ref, whereFields) {
        const whereComparison = this
            .createComparsonStringFromMap(whereFields, 'AND');
        return `DELETE FROM ${ref} WHERE ${whereComparison};`;
    }
    getCreateColumnsQuery(ref, columns) {
        let query = '';
        columns.forEach(column => {
            query = query
                + `ALTER TABLE ${ref} ADD COLUMN IF NOT EXISTS ${column} VARCHAR;`;
        });
        return query;
    }
    getInsertQueryForData(ref, data) {
        const { fields, values } = createSqlStringFromMap_1.default(data);
        return `INSERT INTO ${ref} (${fields}) VALUES (${values});`;
    }
    createReadWithWhereClause(ref, whereFields) {
        const comparisonString = this
            .createComparsonStringFromMap(whereFields, 'AND');
        return `SELECT * FROM ${ref} WHERE ${comparisonString};`;
    }
    createRead(ref) {
        return `SELECT * FROM ${ref};`;
    }
    createComparsonStringFromMap(whereFields, separator) {
        let comparisonStr = '';
        Object.keys(whereFields).forEach((key, i) => {
            comparisonStr
                = comparisonStr
                    + ` ${key} = '${whereFields[key]}'`;
            if (i < lodash_1.size(whereFields) - 1) {
                comparisonStr
                    = comparisonStr
                        + ` ${separator}`;
            }
        });
        return comparisonStr;
    }
}
exports.default = QueryCreator;
