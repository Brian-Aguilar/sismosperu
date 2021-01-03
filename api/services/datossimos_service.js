const scrapeIt = require('scrape-it');

const obtenerSismosInternet = async function () {
  let obtenerDatos = await scrapeIt(process.env.URL, {
    contenido: {
      listItem: "tbody tr",
      name: "contenido",
      data: {
        idSismo: {
          selector: "td:nth-child(2) a"
        },
        archivo: {
          selector : "td:nth-child(2) input:nth-child(2)",
          attr: "value"
        },
        fecha: {
          selector : "td:nth-child(2) input:nth-child(3)",
          attr: "value"
        },
        hora: {
          selector : "td:nth-child(2) input:nth-child(4)",
          attr: "value"
        },
        magnitud: {
          selector : "td:nth-child(2) input:nth-child(5)",
          attr: "value"
        },
        referencia: {
          selector : "td:nth-child(2) input:nth-child(6)",
          attr: "value"
        },
        latitud: {
          selector : "td:nth-child(2) input:nth-child(7)",
          attr: "value"
        },
        longitud: {
          selector : "td:nth-child(2) input:nth-child(8)",
          attr: "value"
        },
        profundidad: {
          selector : "td:nth-child(2) input:nth-child(9)",
          attr: "value"
        },
        intensidad: {
          selector : "td:nth-child(2) input:nth-child(10)",
          attr: "value"

        }
      }
    }

  });

  return obtenerDatos;

}

module.exports = {
  obtenerSismosInternet,
}