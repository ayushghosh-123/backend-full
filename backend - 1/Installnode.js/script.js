const fs = require('fs');

/*write file
append file
copy file
rename file
unlike
 */

// fs.copyFile("hello.txt", "./Copy/copy.txt", (err)=>{
//     if(err) console.log(err.message)
//     else console.log("done")
// })

// fs.unlink("hello.txt", (err) =>{
//     if(err) console.error(err)
//     else console.log("removed")
// })

// fs.rm("./copy", {recursive: true}, (err) =>{
//     if(err) console.error(err)
//     else console.log("removed")
// })

// fs.mkdir("./copy", {recursive: true}, (err) => {
//     if(err) console.error(err)
//     else console.log("create")
// })

// fs.writeFile('./copy/ayush.txt', "hello everyone", err => {
//     if (err) {
//       console.error(err);
//     } else {
//         console.log("done")
//     }
//   });

// fs.appendFile('./copy/ayush.txt', "hello Ayush ", err => {
//     if (err) {
//       console.error(err);
//     } else {
//         console.log("done")
//     }
//   });

fs.readFile('./copy/ayush.txt', (err, data) => {
    if (err) {
      console.error(err);
    } else {
        console.log(data)
    }
  });


