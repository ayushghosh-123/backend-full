const fs = require('fs');

/*write file
append file
copy file
rename file
unlike
 */

fs.copyFile("hello.txt", "./Copy/copy.txt", (err)=>{
    if(err) console.log(err.message)
    else console.log("done")
})