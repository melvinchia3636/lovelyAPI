const axios = require("axios");

axios({
  method: "delete",
  url: "http://localhost:3001/lmao",
}).then(res => console.log(res.data))

// npx -> node package executer
// npm -> node package manager
// node -> yyds