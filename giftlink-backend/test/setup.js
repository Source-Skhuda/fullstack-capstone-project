const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  process.env.MONGO_URL = mongoServer.getUri();
  console.log("TEST MONGO_URL =", process.env.MONGO_URL);
});

after(async () => {
  if (mongoServer) {
    await mongoServer.stop();
  }
  if (app.close) {
    app.close();
  }
  process.exit(0);
});
