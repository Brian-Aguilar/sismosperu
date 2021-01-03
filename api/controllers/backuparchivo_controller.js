const fs = require("fs").promises;
const path = require('path');

const DatoSismosModel = require('../models/datosismo_model')
const nombre_archivo = path.join(__dirname, '/../../backups/sismosperu.json');

const comprobar_respaldo_archivo = (data) => {
  obtener_datos_archivo().then( (datos) => {
    if(JSON.stringify(JSON.parse(datos)) != JSON.stringify(data)) {
      introducir_datos_archivo(data)
    }
  })
}

const formatear_dato = (data = []) => {
  let parseando_dato = [];
  data.map( (dato) => {
    let fechaArray = dato.fecha.split('/').map(i => parseInt(i));
    let horaArray = dato.hora.split(':').map(i => parseInt(i));
    let getTime = new Date(fechaArray[2],fechaArray[1] - 1,fechaArray[0],horaArray[0],horaArray[1],horaArray[2]).getTime();
    let referenciaArray = dato.referencia.split(',');
    let departamentoArray = (referenciaArray[1] != null) ? referenciaArray[1].split('-').map(i => i.trim()) : '-';
    
    parseando_dato.push( new DatoSismosModel(
      dato.idSismo,
      dato.archivo,
      getTime,
      dato.magnitud,
      referenciaArray[0],
      departamentoArray[1] == null ? '-' : departamentoArray[1],
      departamentoArray[0],
      dato.latitud,
      dato.longitud,
      dato.profundidad,
      dato.intensidad
    ).obtener_datos_ingresados() )

  });

  let dato_formateado = parseando_dato.sort( function(a,b) {
    if (parseInt(a.id) === parseInt(b.id) ) {
      return 0;
    }
    else {
      // -1 : 1 => Descendente
      // 1: -1 => Ascendete
      return ( parseInt(a.id) < parseInt(b.id)) ? -1 : 1;
    }
  });
  return dato_formateado;

}


const obtener_datos_archivo = async () => {
  let datos = await fs.readFile(nombre_archivo);
  return datos.toString();
}

const introducir_datos_archivo = (data) => {
  fs.writeFile(nombre_archivo, JSON.stringify(data));
}


module.exports = {
  obtener_datos_archivo,
  comprobar_respaldo_archivo,
  formatear_dato,
}