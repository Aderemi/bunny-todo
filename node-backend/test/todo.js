process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Todos', () => {
    describe('/GET Todos', () => {
        it('it should GET all the Todos', (done) => {
            chai.request(app)
                .get('/todos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
