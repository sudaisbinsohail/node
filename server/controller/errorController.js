import axios from 'axios'



export default (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "Failed";
    res.status(error.statusCode).json({
        status: error.status,
        statusCode: error.statusCode,
        message: error.message,
        stack:error.stack
    });
    // sendErrorsToSlack(error.message , error.statusCode)
};



// const sendErrorsToSlack= async(message,statusCode)=>{
//     await axios.post('https://hooks.slack.com/services/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',{
//         text : `${message} + ${statusCode}`
//     })
// }