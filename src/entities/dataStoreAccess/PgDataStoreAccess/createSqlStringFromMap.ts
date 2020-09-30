export default (map:any)=>{
    let fieldsStr:string = ''
    let valuesStr:string = ''

    const fields = Object.keys(map)
    const values = Object.values(map)

    fields.forEach((element:any, index:any)=>{
        fieldsStr = fieldsStr + `${element}${index!==fields.length-1 ? ',':''}`
    })

    values.forEach((element:any, index:number)=>{
        valuesStr = valuesStr + `'${element}'${index!==values.length-1 ? ',':''}`
    })

    return {
        fields: fieldsStr!,
        values: valuesStr!
    }
}