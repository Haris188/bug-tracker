import DataStoreAccess from "../DataStoreAccess";
import QueryCreator from "./QueryCreator";
import submitQuery from './submitQuery'

export default
class PgDataStoreAccess implements DataStoreAccess{
    private ref
    private queryCreator = new QueryCreator()

    async setIfNotCreateRef(path:string){
        this.ref = path
        const readRefResponse
        = await this.readWhere({})

        return readRefResponse.success
        ? readRefResponse
        : await this
          .setTableCreatedFlagIfNoTable(readRefResponse.data)
    }

    async write(data){
        const columns = Object.keys(data)
        const createColumnResponse = await
        this.createColumnsIfNotExist(columns)

        return createColumnResponse.success
        ? await this
          .insertDataIntoColumns(data)
        : createColumnResponse
    }

    async readWhere(whereFields){
        const query = this.queryCreator
        .getReadWhereQuery(this.ref,whereFields)

        return await submitQuery(query)
    }

    async updateWhere(updateData, whereFields){
        const query = this.queryCreator
        .getUpdateWhereQuery(
            this.ref,
            updateData, 
            whereFields
        )

        return await submitQuery(query)
    }

    async deleteWhere(whereFields){
        return {success:true, data:null}
    }

    private async setTableCreatedFlagIfNoTable(errData){
        const relationNotFoundErr 
        = errData
        && errData.code 
        && errData.code === '42P01'

        if(relationNotFoundErr){
            return await this.createRefAtGivenPath()
        }
        else{
            return {
                success:false, 
                data:'relation could not be created'
            }
        }
    }

    private async createRefAtGivenPath(){
        const query = this
        .queryCreator
        .getCreateRefQueryForPath(this.ref)

        return await submitQuery(query)
    }

    private async createColumnsIfNotExist(columns){
        const query = this.queryCreator
        .getCreateColumnsQuery(this.ref, columns)

        return await submitQuery(query)
    }

    private async insertDataIntoColumns(data){
        const query = this.queryCreator
        .getInsertQueryForData(this.ref, data)

        return await submitQuery(query)
    }
} 