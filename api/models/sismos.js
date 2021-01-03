const { Schema, model } = require('mongoose');

const SismosScheme = Schema({
  id_sismo: {
    type: Number,
    required: true,
  },
  archivo: {
    type: String,
    required: true,
  },
  fecha: {
    type: Number,
    required: true,
  },
  magnitud: {
    type: String,
    required: true,
  },
  referencia: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
  },
  provincia: {
    type: String,
  },
  latitud: {
    type: String,
    required: true,
  },
  longitud: {
    type: String,
    required: true,
  },
  profundidad: {
    type: String,
  },
  intensidad: {
    type: String,
  }
});

SismosScheme.method('toJSON', function () {
  const {__v, _id, ...object} = this.toObject();
  return object;
})

SismosScheme.method('toID', function () {
  const { id_sismo } = this.toObject();
  return id_sismo;
})

module.exports = model('Sismos', SismosScheme);