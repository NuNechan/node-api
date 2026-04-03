const errorHander=(err,req,res,next)=>{
   let statusCode=500
   let errMessage="Server Error!"
   if(err.name==="ValidationError"){
    const errors=Object.values(err.errors).map(el=>{
        return {
            path:el.path,
            message:el.message
        }
    })
    console.log('Error:',errors)
   }
res.status(500).json({
    success:false,
    error:process.env.NODE_ENV=="production"?{}:err.stack
})
}
module.exports=errorHander;