
import pool from './pool'

export default async (query:string)=>{
    console.log(query)
    try{
        const queryResult = await pool.query(query);
        console.log('SUBMIT QUERY ::->');
        console.log(queryResult.rows);
        return {success: true, data: queryResult.rows};
    }
    catch(e){
        console.log(e);
        return {success: false, data:e};
    }
}