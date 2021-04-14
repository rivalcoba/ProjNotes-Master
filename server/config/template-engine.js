// Importando motor de plantillas
import exphbs from 'express-handlebars';
import path from 'path';

// Exportando funcion de configuración
export default (app)=>{
    // Registrando el motor de plantillas
    app.engine('hbs', exphbs({
        extname: '.hbs',
        defaultLayout: 'main',
    }));

    // Seleccionado el motor de plantillas
    app.set('view engine', 'hbs');
    // Estableciendo la ruta de las vistas
    app.set('views', path.join(__dirname, '..', 'views'));

    // retornando la app
    return app;
};