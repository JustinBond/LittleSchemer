var debug,
    atom,
    car,
    cdr,
    cons,
    isNull,
    lat,
    member,
    member2,
    member3,
    rember,
    rember2,
    firsts,
    firsts2,
    insertR,
    insertL,
    subst;

debug = false;

/*****************************************************************************
 * Primitive functions
*****************************************************************************/

// returns true if s is a string or number
atom = function (s) {
    if (typeof s === 'number' || typeof s === 'string') {
        return true;
    }
    return false;
};

// returns the first element of list l
car = function (l) {
    var m = l.slice(0);
    return m.shift();
};

// returns list l except for the first element
cdr = function (l) {
    var m = l.slice(0);
    m.shift();
    return m;
};

// returns list l with s added to the front of the array
cons = function (s, l) {
    l.unshift(s);
    return l;
};

// returns true if list l is zero length
isNull = function (l) {
    return l.length === 0;
};

/*****************************************************************************
 * Recursive functions
*****************************************************************************/


// lat: list of atoms
// Returns true if every element of l is an atom
// Returns true if isNull. So technically, nll (not list of lists).
//

lat = function (l) {
    return (
        isNull(l) ? true :
        atom(car(l)) ? lat(cdr(l)) :
        false
    );
};

// returns true if atom a is a member of lat l
member = function (a, l) {
    return (
        isNull(l) ? false :
        a === car(l) ? true :
        member(a, cdr(l))
    );
};

// This is how The Little Schemer did it
member2 = function (a, l) {
    return (
        isNull(l) ? false :
        ((a === car(l)) || member(a, cdr(l)))
    );
};

// member using boolean operators rather than cond (AKA ternary)
member3= function (a, l) {
    return (
        !isNull(l)
        && ((a === car(l)) || member(a, cdr(l)))
    );

};

// returns lat l with first occurance of atom a removed       
rember = function (a, l) {
    return (
        isNull(l) ? [] :
        a === car(l) ? cdr(l) :
        cons(car(l), rember(a, cdr(l)))
    );
};

// rember using boolean operators rather than cond (AKA ternary)
rember2 = function (a, l) {
    return (isNull(l) && [])
           || (a === car(l) && cdr(l))
           || (cons(car(l), rember(a, cdr(l))));
};


// takes a null list or list of lists and returns a list of the first item
// in each sub-list
firsts = function (l) {
    return (
        isNull(l) ? [] :
        cons(car(car(l)), firsts(cdr(l)))
    );
};

// using booleans rather than cond (AKA ternary)
firsts2 = function (l) {
    return (isNull(l) && [])
           || cons(car(car(l)), firsts(cdr(l)));
};

// inserts new atom n to the right of the first occurance of old atom o in list l
insertR = function (n, o, l) {
    return (
        isNull(l) ? [] :
        o === car(l) ? cons(car(l), cons(n, cdr(l))) :
        cons(car(l), insertR(n, o, cdr(l)))
    );
};


// inserts new atom n to the left of the first occurance of old atom o in list l
insertL = function (n, o, l) {
    return (
        isNull(l) ? [] :
        o === car(l) ? cons(n, l) :
        cons(car(l), insertL(n, o, cdr(l)))
    );
};


// substitutes new atom n for the first occurance of old atom o in list l
subst = function (n, o, l) {
    return (
        isNull(l) ? [] :
        o === car(l) ? cons(n, cdr(l)) :
        cons(car(l), subst(n, o, cdr(l)))
    );
};
