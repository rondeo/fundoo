var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();



describe('Server testing', function() {
    it('should add Single user /addNote POST', function(done) {
      chai.request(server)
        .post('/register')
        .send({'email':'chakri@gmail.com',"title":"testing","description":"testing the add note "})
        .end(function(err, res){
         //console.log(res.body);
         
          res.body.should.be.a('object');  
          done();
        });
    });
})
    