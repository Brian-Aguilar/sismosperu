
class DatoSismosModel {

  constructor(
    id = "",
    archivo = "",
    fecha = 0,
    magnitud = "",
    referencia = "",
    departamento = "",
    provincia = "",
    lalitud = "",
    longitud = "",
    profundidad = "",
    intensidad = "",
  ) {
    this.id = id;
    this.archivo = archivo;
    this.fecha = fecha;
    this.magnitud = magnitud;
    this.referencia = referencia;
    this.departamento = departamento;
    this.provincia = provincia;
    this.lalitud = lalitud;
    this.longitud = longitud;
    this.profundidad = profundidad;
    this.intensidad = intensidad;
    this.url = process.env.URL_PDF;
  }
  parser_id(id = "") {
    const numeroMaximo = 4;
    let obtener_id = id.replace('IGP/CENSIS/RS', '').trim().split('-');
    let obtenniendo_parseo_id = obtener_id[1].length < numeroMaximo
                                ? `${'0'.repeat(numeroMaximo - obtener_id[1].length)}${obtener_id[1]}`
                                : obtener_id[1];
    let obteniendo_id_primero = obtener_id[0];
    return parseInt(obteniendo_id_primero.concat('', obtenniendo_parseo_id));
  }
  url_archivo(url = "", archivo ="") {
    return `${url}${this.parser_id(archivo)}.pdf`;
  }

  obtener_datos_ingresados() {
    return {
      id_sismo: this.parser_id(this.id),
      archivo: this.url_archivo(this.url, this.archivo),
      fecha: this.fecha,
      magnitud: this.magnitud,
      referencia: this.referencia,
      departamento: this.departamento,
      provincia: this.provincia,
      latitud: this.lalitud,
      longitud: this.longitud,
      profundidad: this.profundidad,
      intensidad: this.intensidad,
    }
  }
}

module.exports = DatoSismosModel;