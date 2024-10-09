

export const errorMiddlewre = (err,req, res, next)=>{
    err.message = err.message ?? "Internal Server Error";
    err.statusCode = 404; //err.statusCode ?? 500;

    if(err.code === 11000){
        const error = Object.keys(err.keyPattern).join(",");
        err.message = `Duplicate ${error} entered`;
        err.statusCode = 400;
    }

    if(err.name==="CastError"){
        const errPath = err.path;
        err.message = `Invalid Format of ${errPath}`;
        err.statusCode = 400;
    }
    return res.status(err.statusCode).json({
        success:false,
        message:process.env.NODE_ENV==='DEV' ? err : err.message
    });
}