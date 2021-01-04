# API REST de Sismos en Perú

Página donde hice Web Scraping : [Ultimo Sismo](https://ultimosismo.igp.gob.pe/).

###  URL Peticiones: 

Para obtener los últimos 10 datos:

```http
https://sismoperu.herokuapp.com/api/v1/
```

Para paginar los datos: 

```http
https://sismoperu.herokuapp.com/api/v1/?page=2
```

```json
{
  "page": 2,
  "body": [
    {
      "id_sismo": 20210005,
      "archivo": "https://intranet.igp.gob.pe/reportes-acelerometricos/20210812.pdf",
      "fecha": 1609685491000,
      "magnitud": "3.5",
      "referencia": "10 km al Sur de Tarata",
      "departamento": "Tacna",
      "provincia": "Tarata",
      "latitud": "-17.5621",
      "longitud": "-70.04",
      "profundidad": "11",
      "intensidad": "III Tarata"
    },
    {...9 más}
]
```

Para parsear la fecha:

- Javascript

```javascript
const tiempo = new Date(fecha); // (1609685491000)
```

- Dart:

```dart
var tiempo = new DateTime.fromMillisecondsSinceEpoch(fecha); // (1609685491000)
```



Para obtener datos desde el id_sismo: 

```http
https://sismoperu.herokuapp.com/api/v1/get/:id // :id = 20210005
```

```json
{
  "ok": true,
  "body": {
      "id_sismo": 20210005,
      "archivo": "https://intranet.igp.gob.pe/reportes-acelerometricos/20210812.pdf",
      "fecha": 1609685491000,
      "magnitud": "3.5",
      "referencia": "10 km al Sur de Tarata",
      "departamento": "Tacna",
      "provincia": "Tarata",
      "latitud": "-17.5621",
      "longitud": "-70.04",
      "profundidad": "11",
      "intensidad": "III Tarata"
    },
}
```

