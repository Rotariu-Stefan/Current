// Find shortest plane path that covers the distance from start to ANY airport
const airportPaths = (airports, routes, start) =>{
  const portsCluster=[];
  const rt={};
  for(route of routes){
    if(rt[route[0]]){
      rt[route[0]].push(route[1]);
    } else {
      rt[route[0]]=[route[1]];
    }
  } //m

  //console.log(rt);

  let rtChanged;
  do{
    rtChanged=false;
    for(leave in rt){
      for(arrive of rt[leave]){
        if(rt[arrive]){
          for(arriveNext of rt[arrive]){
            if(!rt[leave].includes(arriveNext)){
              rt[leave].push(arriveNext);
              rtChanged=true;
            }
          }
        }
      }
    }
  }while(rtChanged) //n*m*log(n)?

  console.log(rt);

  if(rt[start]){
    for(arrive of rt[start]){
      if(rt[arrive] && arrive!==leave){
        delete rt[arrive];
      }
    }
  }
  for(leave in rt){
    for(arrive of rt[leave]){
      if(rt[arrive] && arrive!==leave){
        delete rt[arrive];
      }
    }
  } //mlog(n)?

  //console.log(rt);

  return rt[start] ? Object.keys(rt).length-1 : Object.keys(rt).length;
  //return Object.keys(rt).length;
};  //==>m(n+log(n)^2)???

const obj2={
  SIN: [ 'CDG', 'SIN', 'BUD' ],
  CDG: [ 'SIN', 'BUD', 'CDG' ],
  TLV: [ 'DEL', 'DOH', 'CDG', 'SIN', 'BUD' ],
  EWR: [ 'HND', 'ICN', 'JFK', 'LGA' ],
  EYW: [ 'LHR', 'SFO', 'SAN', 'DSM', 'EYW', 'ORD', 'BGI', 'LGA' ],
  LHR: [ 'SFO', 'SAN', 'DSM', 'EYW', 'ORD', 'BGI', 'LGA', 'LHR' ],
  SFO: [ 'SAN', 'DSM', 'EYW', 'ORD', 'BGI', 'LGA', 'LHR', 'SFO' ],
  SAN: [ 'EYW', 'LHR', 'SFO', 'SAN', 'DSM', 'ORD', 'BGI', 'LGA' ]
};

// let rtChanged=false;
// do{
//   rtChanged=false;
//   for(leave in rt){
//     for(arrive of rt[leave]){
//       if(rt[arrive] && arrive!==leave){
//         rt[leave]=rt[leave].concat(rt[arrive]);
//         delete rt[arrive];
//         rtChanged=true;
//       }
//     }
//   }
// }while(rtChanged)

const routesObj={
  DSM: [ 'ORD' ],
  ORD: [ 'BGI' ],
  BGI: [ 'LGA' ],
  SIN: [ 'CDG' ],
  CDG: [ 'SIN', 'BUD' ],
  DEL: [ 'DOH', 'CDG' ],
  TLV: [ 'DEL' ],
  EWR: [ 'HND' ],
  HND: [ 'ICN', 'JFK' ],
  ICN: [ 'JFK' ],
  JFK: [ 'LGA' ],
  EYW: [ 'LHR' ],
  LHR: [ 'SFO' ],
  SFO: [ 'SAN', 'DSM' ],
  SAN: [ 'EYW' ]
}

airports=[
  "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN",
  "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD",
];
routes=[
  ["DSM", "ORD"],
  ["ORD", "BGI"],
  ["BGI", "LGA"],
  ["SIN", "CDG"],
  ["CDG", "SIN"],
  ["CDG", "BUD"],
  ["DEL", "DOH"],
  ["DEL", "CDG"],
  ["TLV", "DEL"],
  ["EWR", "HND"],
  ["HND", "ICN"],
  ["HND", "JFK"],
  ["ICN", "JFK"],
  ["JFK", "LGA"],
  ["EYW", "LHR"],
  ["LHR", "SFO"],
  ["SFO", "SAN"],
  ["SFO", "DSM"],
  ["SAN", "EYW"],
];
start="LGA";

console.log(airportPaths(airports, routes, start));
