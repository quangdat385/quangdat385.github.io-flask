const usersRouter= require('./users')


function route(app){

    app.use('/api/users', usersRouter);
}


module.exports =route;