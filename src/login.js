const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const hashPassword = require('./hashPassword');
const { MongoClient, ServerApiVersion} = require('mongodb');

async function dbConnect() {
    const uri = "mongodb://0.0.0.0:27017";

    // const password = encodeURIComponent(process.env.password);
    // const user = encodeURIComponent(process.env.user);
    // const authMechanism = encodeURIComponent(process.env.auth);

    // uri = `mongodb+srv://${user}:${password}@cluster0.ocdqctt.mongodb.net/?authMechanism=${authMechanism}`
    const dbName = 'Rajnish';

    const client = new MongoClient(uri, {
        useUnifiedTopology: true, serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    await client.connect();
    const db = client.db(dbName);
    return db.collection('User Data')
}

const isValid = (tokenVal) => {
    if (process.env.token === tokenVal) {
        return true;
    }
    else {
        return false;
    }
}

const checkCredentials = async (db, data) => {
    try {
        const user = await db.findOne({ Email: data.Email });
        if (user.Email === data.Email && await bcrypt.compare(data.Password, user.Password)) {
            return hashPassword(data.Password);
        } else {
            // db.insertOne(data);
            return '';
        }
    }
    catch (er) {
        console.log('Error occured', er);
        return '';
    }
}

async function login(req, res) {
    try {
        const db = await dbConnect();
        const incomingToken = req.headers.authorization.substring(7);
        if (isValid(incomingToken)) {
            const { Email, Password } = req.body;
            const data = { 'Email': Email, 'Password': Password };
            const result = await checkCredentials(db, data);
            const user = await hashPassword(Email)

            const response = {
                "val" : user,
                "id":result
            }
            
            console.log(response)

            res.json(response)
        } else {
            res.json('F');
        }
    } catch (error) {
        console.error('Error occured:', error);
        res.json('F');
    }
}



module.exports = login;