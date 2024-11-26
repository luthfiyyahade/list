const { where } = require('sequelize')
const models = require('./../models/index')
const todo = models.data_todo

const express = require('express')
const app = express()

/**
 * controller membuat
 */
app.get("/", async(req, res)=> {
    await todo.findAll({
        attributes: ["id", "name", "status"]
    })
    .then(result=>{
        res.json({
            data:result
        })
    })
    .catch(err=>{
        console.log(err)
    })
})
app.post("/", async(req, res)=>{
    const {
        name,
        status
    } = req.body
    const data = {
        name: name,
        status:status
    }
    await todo.create(data)
    .then(result=>{
        res.json({
            data:data
        })
    })
    .catch(err=>{
        console.log(err)
    })

})

/** 
 * untuk update
 */
app.put("/:id", async(req, res)=> {
    const {id}=req.params
    const {name, status} = req.body
    const data ={
        name: name,
        status: status
    }
    await todo.update(data, {
        where: {
            id: id
        }
    })
    .then(result=>{
        res.json({
            data: data
        })
    })
    .catch(err=> {
        console.log(err)
    })
})

/**
 * untuk hapus
 */
app.delete('/:id',async(req,res)=>{
    const {id} = req.params
    await todo.destroy({
        where:{
            id:id
        }
    })
    .then(result=>{
        res.json({
            message:"data was deleted"
        })
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = app