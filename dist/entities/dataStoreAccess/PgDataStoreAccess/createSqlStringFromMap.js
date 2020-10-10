"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (map) => {
    let fieldsStr = '';
    let valuesStr = '';
    const fields = Object.keys(map);
    const values = Object.values(map);
    fields.forEach((element, index) => {
        fieldsStr = fieldsStr + `${element}${index !== fields.length - 1 ? ',' : ''}`;
    });
    values.forEach((element, index) => {
        valuesStr = valuesStr + `'${element}'${index !== values.length - 1 ? ',' : ''}`;
    });
    return {
        fields: fieldsStr,
        values: valuesStr
    };
};
