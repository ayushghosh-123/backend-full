var arr = [1, 2, 3, 2, 5];

// foreach 

arr.forEach(function(val){
    console.log(val + " hello")
})

// map 
var newArr = arr.map((val) => {
    return val+15;
})

console.log(newArr)

// filter
const arr_fil = arr.filter((val) => {
    if(val>3){
        return true
    }
    else{
        return false
    }
})

console.log(arr_fil)

// find 

var findout = arr.find((val) => {
    if (val === 2) return val
})

console.log(findout)


// index of 

var position = arr.indexOf(3)
console.log(position)