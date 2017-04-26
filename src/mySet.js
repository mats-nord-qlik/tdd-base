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
  // Monkey patch Set. the => doesn't bind 'this' to the context
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

module.exports = Set;


