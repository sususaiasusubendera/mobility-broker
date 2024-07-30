const now = new Date();
const expirationDate = new Date(now);
expirationDate.setDate(now.getDate() + 7);
expirationDate.setHours(0, 0, 0, 0); 

const expiresIn = Math.floor((expirationDate - now) / 1000);

console.log(expiresIn);