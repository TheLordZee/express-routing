const express = require('express');
const XError = require('./xError')
const {merge, mergeSort, mean } = require('./func');
const { json } = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/mean', (req, res, next)=>{
    try{
        const list = req.query.nums.split(',')
        let total = 0;
        for(let x of list){
            let num = parseInt(x)
            if(isNaN(x)){
                throw new XError("Invalid query     parameter", 403)
            }
            total += num;
        }
        console.log(req.query)
        const json = {
            operation: "mean",
            value: total/list.length 
        }
        res.send(json)
    }catch(e){
        next(e)
    }
})

app.get('/median', (req,res,next)=>{
    try{
        const list = req.query.nums.split(',')
        const nums = []
        for(let x of list){
            let num = parseInt(x)
            if(isNaN(x)){
                throw new XError("Invalid query     parameter", 403)
            }
            nums.push(num)
        }
        let median;
        if(nums.length % 2 === 0){
            median = mean(nums)
        }else{
            let sortedNums = mergeSort(nums);
            median = sortedNums[Math.floor(nums.length/2)]
        }
        const json = {
            operation: "median",
            value: median 
        }
        res.send(json)

    }catch(e){
        console.log(e)
        next(e)
    }
})

app.get('/mode', (req, res, next) => {
    try{
        const list = req.query.nums.split(',')
        const count = {}
        let mode;
        for(let x of list){
            let num = parseInt(x)
            if(isNaN(x)){
                throw new XError("Invalid query     parameter", 403)
            }
            if(count[num]){
                count[num]++
            }else{
                count[num] = 1
            }
        }
        for(let key of Object.keys(count)){
            console.log(key, count[key])
            if((count[key] > mode || mode === undefined) && count[key] > 1){
                mode = key
            }
        }
        if(mode === undefined){
            mode = 'none'
        }
         const json = {
            operation: "mode",
            value: mode 
        }
        res.send(json)
    }catch(e){
        next(e)
    }
})

app.use((req, res, next)=>{
    const e = new XError("Page not found", 404)
    next(e)
})

app.use((err, req, res, next) => {
    let status = err.status || 505;
    let msg = err.msg || 'Unknown error' 
    res.status(status).json({
        error: {msg, status}
    })
})

app.listen(3000, function(){
    console.log('Server started on port 3000');
});
