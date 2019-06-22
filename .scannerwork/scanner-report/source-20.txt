var assert=require('assert');
var chai=require('chai');
var chaiHttp=require('chai-http');
var client=require('redis').createClient();

client.on("error ",function(err){
    console.log("error "+err);
    
})
describe("testing the redis",function(){

    it("testing the getting things are objects",function(){
        client.hgetall('chakri@gmail.com',function(err,reply){
            assert.equal(Object,reply);
            assert.equal('chakri',replay.name);
        })
    })
})