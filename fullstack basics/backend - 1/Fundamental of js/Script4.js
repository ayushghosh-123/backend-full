// var bolb = await fetch('https://randomuser.me/api/')
// var res = await bolb.json()
// console.log(res)

// line by line code run - synchronous
// not line by line code run- async

async function Ayush() {
     var blob =  await fetch(`https://randomuser.me/api/`)
     var ans = await blob.json()

     console.log(ans)
}

Ayush()
