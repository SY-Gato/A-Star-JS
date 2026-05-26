let width = 4;
let height = 4;
// Assuming the bottom-left is at point (0,0)
// Highest point would be (width - 1, height - 1)
// ex. width=4,height=4 so highest point would be (3. 3)

/*let highestX = width - 1;
let highestY = height - 1;*/


function dist(pos1, pos2) {
  let x1 = pos1[0];
  let y1 = pos1[1];
  let x2 = pos2[0];
  let y2 = pos2[1];
  
  return Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2));
}



function reconstructOLd(cameFrom, cur) {
  let out = [];
  // let cNode;
  let cNode = cur;
  while (true) {
    //if (cameFrom.hasOwnProperty(cur)) {
    //  // out.push()
    //  o/ut.push(cameFrom[cur]);
    //  c
    //}
    if (cameFrom.hasOwnProperty(cNode)) {
      out.push(cameFrom[cNode]);
      cNode = cameFrom[cNode];
    }
  }
}
// function reconstruct(cameFrom, cur1)
function reconstruct(cameFrom, current) {
  let out = [];
  let cNode = current;
  while (true) {
    out.push(cNode);
    if (cameFrom.hasOwnProperty(cNode)) {
      cNode = cameFrom[cNode];
    } else {
      break;
      // We're done!
    }
  }
  let out2 = [];
  /*for (let i = 0; i < out.length; i++) {
    out2.push(out.pop)
  }*/
  while (out.length > 0) {
    out2.push(out.pop());
  }
  // return out
  return out2;
}


//function getNeighbors(pos)
function getNeighbors(pos) {
  /*
  Only moving directly up, down, left, and right (NO DIAGONALS)
  */
  
  let highestX = width - 1;
  let highestY = height - 1;
  
  let minX = 0;
  let minY = 0;
  
  let px = pos[0];
  // let py = pos[1]
  let py = pos[1];
  
  let nodes = [];
  
  /*if (px == highestX) {
    // No right
  }*/
  if (px < highestX) {
    // There's a node to the right!
    nodes.push([px + 1, py]);
  }
  
  if (px > minX) {
    // There's a node to the left!
    nodes.push([px - 1, py]);
  }
  
  if (py > minY) {
    // There's a node below!
    nodes.push([px, py - 1]);
  }
  
  if (py < highestY) {
    // There's a node above!
    nodes.push([px, py + 1]);
  }
  
  return nodes;
}

function aStar(start, goal, h) {
  // let open = {}
  let open = [];
  let cameFrom = {};
  
  let gScore = {};
  
  let fScore = {};
  
  open.push(start);
  
  gScore[start] = 0;
  
  // fScore[start] = h(start);
  fScore[start] = h(start, goal);
  // pass in goal so it knows what to get distance for
  
  // while (#)
  while (open.length > 0) {
    let current;
    if (open.length == 1) {
      current = open.pop();
      // Pop works because it's only 1 item.
    // } else {
    } else if (open.length > 1) {
      //let lowestScore;
      //let lowestIdx;
      // let lowestScore = -999999999999;
      let lowestScore = fScore[open[0]];
      let lowestIdx = 0;
      for (let i = 1; i < open.length; i++) {
        let curScore = fScore[open[i]];
        if (curScore < lowestScore) {
          lowestScore = curScore;
          lowestIdx = i;
        }
      }
      current = open[lowestIdx];
      open.splice(lowestIdx, 1);
    // }
    } else {
      break;
      // While loop checking if its length == 0. We reached here, but it's length is 0.
      // What?
    }
    
    if (current == goal) {
      return reconstruct(cameFrom, current);
    }
    
    
    // Already removed it
    
    let neighbors = getNeighbors(current);
    for (let node of neighbors) {
      // let gs1 = gScore[current];
      // let gs1 = gScore[current] + dist(current, node);
      // dist(current, node) = 1 always (because no diagonals)
      let gs1 = gScore[current] + 1;
      
      let mustSet = false;
      
      // if gs1 < gScore[]
      if (!gScore.hasOwnProperty(node)) {
        // gScore[node] = 
        //gScore[node] = "change";
        mustSet = true;
      }
      
      if (mustSet || (gs1 < gScore[node])) {
        cameFrom[node] = current;
        gScore[node] = gs1;
        fScore[node] = gs1 + h(node, goal);
        // if node 
        if (open.indexOf(node) == -1) {
          // Doesn't exist, add it
          open.push(node);
        }
      }
    }
  }
  // return true;
  return false;
}