const assert = require('assert');
const Item = require('../items/Item');
const ShoppingList = require('../shoppingList');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Item Controller', function() {
    beforeEach((done) => {
        Item.deleteMany({}, (err) => {
            done();
        });
    });

    describe('/GET items', function() {
        it('it should GET all the items', (done) => {
            chai.request(server)
            .get('/Item')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });

    describe('/POST item', function() {
        it('it should create item', (done) => {
            const item = {
                name: "Toy1"
            };
            chai.request(server)
            .post('/Item')
            .send(item)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                done();
            });
        });
    });
});

describe('ShoppingList Controller', function() {
    beforeEach((done) => { //Before each test we empty the database
            ShoppingList.deleteMany({}, (err) => {
            done();
        });
    });
  
    describe('/POST shoppingList', function() {
        it('it should create shoppingList', (done) => {
            const shoppingList = {
                name: "Kangtle1",
                items: ["Toy1"]
            };
            chai.request(server)
            .post('/ShoppingList')
            .send(shoppingList)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                done();
            });
        });
    });

    describe('/GET ShoppingLists', function() {
        it('it should GET all the ShoppingLists', (done) => {
            chai.request(server)
            .get('/ShoppingList')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
                done();
            });
        });
    });
});
