const { json } = require("express");
const Product = require("../models/productModels")

exports.create=async(req,res,next)=>{
    try{
        console.log(req.body)
        const exist=await Product.findOne({name:req.body.name});
        if(exist){
          return  res.status(409).json({
                message:"product already has !"
            })
        }
        const data=await Product.create({
           ...req.body,currentStock:0
        });
        
        
res.status(201).json({
    success:true,
    message:"sucess",
    result:data
})
    }catch(error){
next(error)
    }

}
exports.findAll = async (req, res, next) => {
    try {
       
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;
        let queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
        excludedFields.forEach(el => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let filters = JSON.parse(queryStr);
        if (req.query.search) {
            filters.$or = [
                { name: { $regex: req.query.search, $options: "i" } }
            ];
        }
        let sortBy = '-createdAt';
        if (req.query.sort) {
            sortBy = req.query.sort.split(',').join(' ');
        }
        const data = await Product.find(filters)
            .sort(sortBy)
            .skip(skip)
            .limit(limit)
            .populate('category', 'name'); 
        const total = await Product.countDocuments(filters);
        res.status(200).json({
            success: true,
            count: data.length,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            result: data
        });
    } catch (error) {
        next(error);
    }
};
exports.findOne=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const data=await Product.findById(id).populate('category','name');
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
        const data= await Product.findByIdAndUpdate(id,req.body);
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
        const data= await Product.findByIdAndDelete(id,req.body);
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