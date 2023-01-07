function isValid(value){
    if (typeof value=== "undefined" || typeof value ===null) return false
    if (typeof value=== "string" &&  value.trim().length===0) return false
    if (typeof value=== "number") return false
    return true
}

module.exports={isValid}