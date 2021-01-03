const moongose = require('mongoose');

const dbConnection = async () => {
  try {
    await moongose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('mongoDB online.');
  } catch (error) {
    console.error(error);
    throw new Error('Error en la base de datos');
  }
}

module.exports = {
  dbConnection
}