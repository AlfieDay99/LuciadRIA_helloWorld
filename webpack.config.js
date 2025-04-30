const path = require('path');
 
module.exports = {
  devServer: {
    static: path.join(__dirname, 'dist')
  }
};