const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  try {
    const saltRounds = 10; // You can adjust this value for the desired level of security
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // console.log(hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    // Handle the error appropriately
    throw error;
  }
}


module.exports = hashPassword;