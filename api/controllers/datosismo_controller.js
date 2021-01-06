const { request, response } = require("express");
const Sismos = require("../models/sismos");
const { obtenerSismosInternet } = require("../services/datossimos_service");
const { formatear_dato } = require("./backuparchivo_controller");

const obtener_datos_sismos = (req = request, res = response) => {
	res.header("Access-Control-Allow-Origin", "*");
	obtenerSismosInternet().then(async ({ data, response }) => {
		try {
			const obteniendoPagina =
				req.query.page || req.query.page < 1 ? parseInt(req.query.page) : 1;
			if (response.statusCode == 200) {
				const datoParseado = formatear_dato(data.contenido);
				const obtenerDatosFaltantes = await obtener_datos_faltantes(
					datoParseado
				);

				if (obtenerDatosFaltantes.ok) {
					sincronizacion_database(obtenerDatosFaltantes.body);
					// comprobar_respaldo_archivo(datoParseado); // -> respaldo a un archivo .json
					console.log("Actualizando...");
				}
			}

			setTimeout(async () => {
				const obtenerDatosDatabase = await obtener_sismo_database(
					obteniendoPagina
				);
				res.json(obtenerDatosDatabase);
			}, 100);
		} catch (error) {
			console.error(error);
		}
	});
};

const sincronizacion_database = async (datosFaltantes = []) => {
	try {
		for (const dato of datosFaltantes) {
			const sismo = new Sismos(dato);
			await sismo.save();
		}
	} catch (error) {
		console.error(error);
	}
};

const obtener_datos_faltantes = async (datoInternet = []) => {
	const ultimoID = await ultimoDato();
	let datosFaltantes = datoInternet.filter((i) => i.id_sismo > ultimoID);
	return {
		ok: isNaN(datosFaltantes),
		body: datosFaltantes,
	};
};

const obtener_sismo_database = async (page = 1) => {
	try {
		const limitePagina = 10;
		const sismos = await Sismos.find()
			.sort({ id_sismo: "desc" })
			.skip(page * limitePagina - limitePagina)
			.limit(limitePagina);
		return {
			page,
			body: sismos,
		};
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Error en la base de datos.",
		});
	}
};

const ultimoDato = async () => {
	const ultimoSismo = await Sismos.findOne()
		.sort({ id_sismo: "desc" })
		.limit(1);
	return await ultimoSismo.toID();
};

const obtener_id_sismo = async (req = request, res = response) => {
	res.header("Access-Control-Allow-Origin", "*");
	try {
		const obtenerDatosID = await Sismos.findOne({ id_sismo: req.params.id });
		res.json({
			ok: true,
			body: obtenerDatosID.toJSON(),
		});
	} catch (error) {
		console.error(error);
		res.json({
			ok: false,
			body: [],
		});
	}
};

module.exports = {
	obtener_datos_sismos,
	obtener_id_sismo,
};
