const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');

//const indexRoutes = require('./routes/index')
const tasksRoutes = require('./routes/tasks')

// settings
app.set('views', path.join(__dirname, 'views'));
// seteando variable port / usar el puerto del SO o el 3000
app.set('port', process.env.PORT || 3000); 
// poder enviar a los clientes o navegadores HTML's
app.engine('html', require('ejs').renderFile);
// configurar motor de plantillas
app.set('view engine', 'ejs');

// middlewares
// funciones que se ejecutan antes de recibir la informacion que me esta enviando el navegador
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
//app.use(indexRoutes);
app.use('/api', tasksRoutes);

// static files
app.use(express.static(path.join(__dirname, 'dist')))

app.listen(app.get('port'), () => {
	console.log('server on port', app.get('port'));
});