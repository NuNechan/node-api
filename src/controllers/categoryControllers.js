const Category = require("../models/categoryModels")

exports.create=async(req,res,next)=>{
    try{
     const exist=await Category.findOne({name:req.body.name});
     if(exist){
        res.status(401).json({
            message:"category already has on data!"
        })
     }
     const data= await Category.create(req.body);
       res.status(201).json({
        sucess:true,
        result:data
       })
    }catch(error){
        next(error)
    }
}
exports.findAll=async(req,res,next)=>{
    try{
        const page=req.query.page *1 || 1
        const limit= req.query.limit *1 || 10
        const skip =(page-1)* limit
        const querySearch={}
        if(req.query.search){
            querySearch['$or']=[
                {name:{$regex: req.query.search,$options:"i"}}
            ]
        }
        const data = await Category.find(querySearch)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await Category.countDocuments(querySearch);
        res.status(200).json({ 
            success: true,
            count: data.length,
            total,
            page,
            result: data
    })
    }catch(error){
        next(error)
    }
}
exports.findOne=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const data=await Category.findById(id);
        if(!data){
            res.status(404).json({
                message:"Not found!"
            })
        }
       res.status(201).json({
        sucess:true,
        result:data
       })
    }catch(error){
        next(error)
    }
}
exports.update=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const data= await Category.findByIdAndUpdate(id,req.body);
        if(!data){
            res.status(404).json({
                message:'not found!'
            })
        }
       res.status(201).json({
        sucess:true,
        result:data
       })
    }catch(error){

        next(error)
    }
}
exports.remove=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const data=await Category.findByIdAndDelete(id)
        if(!data){
            res.status(404).json({
                message:'not found!'
            })
        }
       res.status(201).json({
        sucess:true,
        message:" delete sucess",
        result:data
       })
    }catch(error){
        next(error)
    }
}

