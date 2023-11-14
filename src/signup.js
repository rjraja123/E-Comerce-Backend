const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const hashPassword = require("./hashPassword");

const { MongoClient, ServerApiVersion } = require("mongodb");

async function dbConnect() {
  // const uri = "mongodb://127.0.0.1:27017";

    const password = encodeURIComponent(process.env.password);
    const user = encodeURIComponent(process.env.user);
    const authMechanism = encodeURIComponent(process.env.auth);

    uri = `mongodb+srv://${user}:${password}@rajnishapi.iezvdde.mongodb.net/?authMechanism=${authMechanism}`
    
  const dbName = "Rajnish";
  // console.log('Your Request got here dbConnect')
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  const db = client.db(dbName);

  const isCollection = db.listCollections({ name: "User Data" }).hasNext();
  if (!isCollection) return await db.createCollection("User Data");
  else return db.collection("User Data");
}

const isValid = (tokenVal) => {
  if (process.env.token === tokenVal) {
    return true;
  } else {
    return false;
  }
};

const addUser = async (db, data) => {
  try {
    // console.log('Your Request got here addStudent',data)
    const isExist = await db.findOne({
      Name: data.Name,
      Email: data.Email,
      Phone: data.Phone,
    });
    // console.log(isExist);
    if (isExist != null) {
      return false;
    } else {
      db.insertOne(data);
      return true;
    }
  } catch (er) {
    console.log("Error occured", er);
    return false;
  }
};

async function signup(req, res) {
  try {
    // console.log('Your Request got here Signup')
    const db = await dbConnect();
    const incomingToken = req.headers.authorization.substring(7);
    if (isValid(incomingToken)) {
      const { Name, Email, Phone, Password } = req.body;
      const password = await hashPassword(Password);
      const user = await hashPassword(Email);
      console.log(password);
      const data = {
        Name: Name,
        Email: Email,
        Phone: Phone,
        Password: password,
      };
      console.log("Successfully Processed\n", data);
      // const collection = await db;
      const result = await addUser(db, data);
      if (result == true) {
        const response = {
          val: user,
          id: password,
        };
        res.json(response);
      } else {
        res.json("F");
      }
      // console.log(result);
      // res.json(result);
      // res.send('Successfully Processed');
    } else {
      // console.log('Unsuccessful  :  ', incomingToken);
      res.json("F");
    }
  } catch (error) {
    // console.error('Error occured:', error);
    res.json("F");
  }
}

module.exports = signup;
