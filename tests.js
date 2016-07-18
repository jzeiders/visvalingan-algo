'use strict'

var chai = require("chai");
var expect = chai.expect;
var visAlgo = require('./source/Visvalingam.js');
visAlgo = new visAlgo();
var points = [],
RANGE = 0.001
beforeEach(function() {
    points = []
    for (var i = 0; i < 16; i++) {
        points.push({
            x: Math.random() * RANGE - RANGE/2,
            y: Math.random() * RANGE - RANGE/2
        })
    }
})
describe("Simplify", function() {
    var simplfied;
    beforeEach(function(){
      simplfied = visAlgo.simplify(points, 0.5);
    })
    it("should return points", function() {
        for (var i = 0; i < simplfied; i++) {
            expect(simplfied[i]).to.have.property("x", "y")
        }
    });
    it("should remove points", function() {
        expect(points.length - simplfied.length).to.be.equal(8);
    })
});
describe("Calculate Triangles", function() {
    var triangles;
    beforeEach(function(){
      triangles = visAlgo.calculateTriangles(points);
    })
    it("should return triangles", function() {
        for(var i = 0; i < triangles.length; i++)
          expect(triangles[i]).to.be.a("number");
    })
    it("should have a length two less", function(){
      expect(triangles.length - points.length).to.be.equal(-2)
    })
});
describe("HeronsFormula", function() {
    var area = visAlgo.heronsFormula(1, 1, 1);
    it("should return area from three points", function() {
        expect(Math.abs(area - 0.43)).to.be.most(0.01);
    });
});
describe("Dist", function() {
    var pt1 = {
        x: 43.12123,
        y: 34.23
    },
    pt2 = {
        x: -15.343,
        y: -34.99
    }
    var distance = visAlgo.dist(pt1, pt2);
    it("should calculate distance", function() {
        expect(Math.abs(distance - (9568 * 1000))).to.be.most(300 * 1000)
    })
});
