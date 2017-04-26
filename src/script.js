// Code goes here
log = console.log;

let set1 = new Set();

set1.add(0);
set1.add(1);
set1.add(2);
set1.add(3);
set1.add(3);
log(set1.size);

let set2 = new Set([2, 3, 4, 5]);
log(set2.size);
nl();
//Keys and values are the same in Set.
log("Keys and values are the same, entries are tuples");
log([...set1.keys()]);
log([...set1.values()]);
log([...set1.entries()]);

log("entries:");
let entries = set1.entries();
let entry = entries.next(); //Look ahead!
while ( !entry.done ) {
  log(entry.value);
  entry = entries.next();
}
log(entry.done);

log("values:");
for(let value of set1.values()) log(value);

log("keys:");
for(let key of set1.keys()) log(key);

nl();

log("Set operations");
let intersection = new Set([...set1].filter(x => set2.has(x)));
log([...intersection]);

let difference = new Set([...set1].filter(x => !set2.has(x)));
log([...difference]);

// Basic set operations implementations
// Superset --> All elements in B are contained in A
// A is a superset of B, B is a subset of A, if B and A are equal they are both subset and superset of each other
Set.prototype.isSuperset = function(subset) {
    for (var elem of subset) {
      if (!this.has(elem)) {
        return false;
      }
    }
    return true;
  }
  // Monkey path Set. the => doesn't bind 'this' to the context
Set.isSuperset = (supSet, subset) => {
  for (let elem of subset) {
    if (!supSet.has(elem)) {
      return false;
    }
  }
  return true;
}

//A union B -> all of A and all of B, but not duplicates
Set.prototype.union = function(setB) {
  var union = new Set(this);
  for (var elem of setB) {
    union.add(elem);
  }
  return union;
}

//A intersect B -> which are in both of those sets
Set.prototype.intersection = function(setB) {
    var intersection = new Set();
    for (var elem of setB) {
      if (this.has(elem)) {
        intersection.add(elem);
      }
    }
    return intersection;
  }
  // A-B -> elements that are in only one set but not in the other
Set.prototype.difference = function(setB) {
  var difference = new Set(this);
  for (var elem of setB) {
    difference.delete(elem);
  }
  return difference;
}
 // A eclusive-or B, it does not return items in the intresection: ex {1,2,3} symdiff {3,4} -> {1,2,4}
 // as exclusive or is the same as (!A and B) or (A and !B). alt: (A or B) and (!A or !B)
Set.prototype.symetricDifference = function symetricDifference (setB){ // put in a name on the function
  // This is a very ineffective implementation ;-), but symdiff is anyway rarely used.
  return this.union(setB).difference(this.intersection(setB));
}



//Examples
var setA = new Set([1, 2, 3, 4]),
  setB = new Set([2, 3]),
  setC = new Set([3, 4, 5, 6]);

log("setA")
log([...setA])
log("setB")
log([...setB.keys()])
log("setC")
log([...setC.values()])

log("isSuperset -> " + setA.isSuperset(setB)); // => true
log("isSuperset -> " + Set.isSuperset(setA, setB)); // => true
log("union:")
log([...setA.union(setC)]); // => Set [1, 2, 3, 4, 5, 6]
log("intersection:")
log([...setA.intersection(setC)]); // => Set [3, 4]
log("difference:")
log([...setA.difference(setC)]); // => Set [1, 2]
log("symetric-difference:")
log([...setA.symetricDifference(setC)]); // => Set [1, 2, 5, 6]



