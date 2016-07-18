'use strict'
/*jshint esversion:6*/
function Visvalingam(){}


Visvalingam.prototype.calculateTriangles = function(data){
  var triangles = [];
  for(var i = 0; i < data.length - 2; i++){
       var area = this.heronsFormula(this.dist(data[i], data[i+1]), this.dist(data[i+1], data[i+2]), this.dist(data[i], data[i+2]));
       triangles.push(area);
  }
  return triangles;
};
Visvalingam.prototype.simplify = function(points, precentRemoved){
  points = points.slice();
  var triangles = this.calculateTriangles(points),
  desiredLength = Math.ceil(points.length * (1-precentRemoved));
  triangles.pop();
  while(points.length > desiredLength){
    var smallest = triangles.indexOf(Math.min(...triangles));
    triangles.splice(smallest,1);
    points.splice(smallest+1,1);
  }
  return points;
};
Visvalingam.prototype.heronsFormula = function(a,b,c){
  var p = (a + b + c) / 2;
  return Math.sqrt(p*(p-a)*(p-b)*(p-c));
};

Visvalingam.prototype.dist = function(pt1, pt2){
  if(pt1.hasOwnProperty('x')){
    return this.getDistance(pt1.y,pt1.x,pt2.y, pt2.x);
  }
  if(pt1.hasOwnProperty('lat')){
    return this.getDistance(pt1.lat,pt1.lng,pt2.lat,pt2.lng);
  }
  if(pt1.hasOwnProperty('latitude')){
    return this.getDistance(pt1.latitude, pt1.longitude, pt2.latitude, pt2.longitude);
  }
};

Visvalingam.prototype.getDistance = function(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 1000; // Distance in Meters
};

var deg2rad = function deg2rad(deg) {
    return deg * (Math.PI / 180);
};

module.exports = Visvalingam;
