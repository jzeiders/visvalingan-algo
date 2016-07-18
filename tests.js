'use strict'

var chai = require("chai");
var expect = chai.expect;
var visAlgo = require('./source/Visvalingam.js');
visAlgo = new visAlgo();
var points = [],
RANGE = 0.001
beforeEach(function() {
    // points = []
    // for (var i = 0; i < 16; i++) {
    //     points.push({
    //         x: Math.random() * RANGE - RANGE/2,
    //         y: Math.random() * RANGE - RANGE/2
    //     })
    // }
    points = [ { lng: -88.1945318, lat: 40.1111059 },
  { lng: -88.1946355, lat: 40.1101751 },
  { lng: -88.1946133, lat: 40.1099565 },
  { lng: -88.1946418, lat: 40.1097618 },
  { lng: -88.1946465, lat: 40.1084951 },
  { lng: -88.1944971, lat: 40.1082277 },
  { lng: -88.194428, lat: 40.1080469 },
  { lng: -88.1942252, lat: 40.1079285 },
  { lng: -88.1931887, lat: 40.1069522 },
  { lng: -88.1932358, lat: 40.106656 },
  { lng: -88.1920564, lat: 40.1051687 },
  { lng: -88.1921035, lat: 40.1053926 },
  { lng: -88.1921394, lat: 40.1055824 },
  { lng: -88.1909657, lat: 40.1058897 },
  { lng: -88.1908146, lat: 40.1057448 },
  { lng: -88.1901822, lat: 40.1045592 },
  { lng: -88.1893811, lat: 40.1053527 },
  { lng: -88.1865252, lat: 40.1062484 } ]

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
        expect(points.length - simplfied.length).to.be.equal(Math.ceil(points.length*0.5));
    })
});
describe("Calculate Triangles", function() {
    var triangles;
    beforeEach(function(){
      triangles = visAlgo.calculateTriangles(points);
    })
    it("should return triangles", function() {
        for(var i = 0; i < triangles.length; i++)
          expect(triangles[i]).to.be.above(0);
    })
    it("should have a length two less", function(){
      expect(triangles.length - points.length).to.be.equal(-2)
    })
});
describe("Herons Formula", function() {
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
    it("should be greater than 0", function(){
      expect(visAlgo.dist(points[0], points[1])).to.be.above(0);
    })
});
