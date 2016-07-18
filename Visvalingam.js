

calculateTriangles = function(data){
  var triangles = [];
  for(var i = 0; i < data.length - 2; i++){
    sides = [dist(data[i], data[i+1]), dist(data[i+1], data[i+2]), dist(data[i], data[i+2])];
    triangles.push(heronsFormula(sides));
  }
  return triangles;
};
reduceTriangles = function(points, precentRemoved){
  triangles = calculateTriangles(points);
  desiredLength = Math.Ceiling(triangle * (1-precent));
  while(triangles.length > desiredLength){
    smallest = triangles.indexOf(Math.min(triangles));
    triangles.splice(smallest);
    points.splice(smallest+1);
  }
  return points;
};
heronsFormula = function(a,b,c){
  var p = (a + b + c) / 2;
  return Math.Sqrt(p(p-a)(p-b)(p-c));
};

dist = function(pt1, pt2){
  if(pt1.hasOwnProperty('x')){
    return getDistance(pt1.y,pt1.x,pt2.y, pt2.x);
  }
  if(pt1.hasOwnProperty('lat')){
    return getDistance(pt1.lat,pt2.lon,pt2.lat,pt2.lon);
  }
  if(pt1.hasOwnProperty('latitude')){
    return getDistance(pt1.latitude, pt1.longitude, pt2.latitude, pt2.longitude);
  }
};

getDistance = function(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log("Distance: ", d * 1000);
    return d * 1000; // Distance in Meters
};

deg2rad = function deg2rad(deg) {
    return deg * (Math.PI / 180);
};
