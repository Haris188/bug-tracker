
import {size} from 'lodash'
import createSqlStringFromMap from './createSqlStringFromMap'

class QueryCreator {
    getCreateRefQueryForPath(ref){
        return `CREATE TABLE ${ref} ();`
    }

    getReadWhereQuery(ref,whereFields){
        return size(whereFields) > 0
        ? this
          .createReadWithWhereClause(ref, whereFields)
        : this
          .createRead(ref)
    }

    getUpdateWhereQuery(ref,updateData, whereFields){
        const updateComparison 
        = this.createComparsonStringFromMap(updateData,',')

        const whereComparison
        = this.createComparsonStringFromMap(whereFields,'AND')

        return `UPDATE ${ref} SET ${updateComparison} WHERE ${whereComparison};`
    }

    getCreateColumnsQuery(ref, columns){
        let query = ''

        columns.forEach(column=>{
            query = query
            + `ALTER TABLE ${ref} ADD COLUMN IF NOT EXISTS ${column} VARCHAR;`
        })

        return query
    }

    getInsertQueryForData(ref, data){
        const {fields, values}
        = createSqlStringFromMap(data)

        return `INSERT INTO ${ref} (${fields}) VALUES (${values});`
    }

    private createReadWithWhereClause(ref,whereFields){
        const comparisonString = this 
        .createComparsonStringFromMap(whereFields, 'AND')

        return `SELECT * FROM ${ref} WHERE ${comparisonString};`
    }

    private createRead(ref){
        return `SELECT * FROM ${ref};`
    }

    private createComparsonStringFromMap(whereFields, separator){
        let comparisonStr = ''

        Object.keys(whereFields).forEach((key, i)=>{
            comparisonStr 
            = comparisonStr 
            + ` ${key} = '${whereFields[key]}'`

            if(i<size(whereFields)-1){
                comparisonStr 
                = comparisonStr 
                + ` ${separator}`
            }
        })

        return comparisonStr
    }
}

export default QueryCreator