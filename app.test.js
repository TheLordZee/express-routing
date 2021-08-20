const axios = require('axios')

describe('test routes', ()=>{
    test('/mean should return the average', async() => {
        let res = await axios.get('http://localhost:3000/mean?nums=1,3,5,7')
        expect(res.data.operation).toEqual('mean')
        expect(res.data.value).toEqual(4)
    })

    test('/median should return the mid number for an odd numbered list', async() => {
        let res = await axios.get('http://localhost:3000/median?nums=1,3,5,7,8')
        expect(res.data.operation).toEqual('median')
        expect(res.data.value).toEqual(5)
    })
    
    test('/median should return the average for an even numbered list', async() => {
        let res = await axios.get('http://localhost:3000/median?nums=1,3,5,7')
        expect(res.data.operation).toEqual('median')
        expect(res.data.value).toEqual(4)
    })

    test('/mode should return the most common number(s)', async() => {
        let res = await axios.get('http://localhost:3000/mode?nums=1,3,5,7,8,8')
        expect(res.data.operation).toEqual('mode')
        expect(res.data.value).toEqual(["8"])
        res = await axios.get('http://localhost:3000/mode?nums=1,3,5,7,7,8,8')
        expect(res.data.operation).toEqual('mode')
        expect(res.data.value).toEqual(["7","8"])
    })
    test("/mode should return none if there isn't a most common number", async() => {
        let res = await axios.get('http://localhost:3000/mode?nums=1,3,5,7,8')
        expect(res.data.operation).toEqual('mode')
        expect(res.data.value).toEqual("none")
        res = await axios.get('http://localhost:3000/mode?nums=1,1,3,3,4,4')
        expect(res.data.operation).toEqual('mode')
        expect(res.data.value).toEqual("none")
    })
})