
const apiResponse = (res ,message , statusCode , data )=>{
    return res.status(statusCode).json({
        status : 'success',
        message:message,
        data:data
    })
}


export default apiResponse