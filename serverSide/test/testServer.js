var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);


describe('Server testing', function() {
  it('should add Single user /register POST', function(done) {
    chai.request(server)
      .post('/register')
      .send({'name': 'chakri', 'email': 'chakri199508@gmail.com','password':'12345678'})
      .end(function(err, res){
       
        res.body.should.be.a('object');  
        done();
      });
  });
  
});
