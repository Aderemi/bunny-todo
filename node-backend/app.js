const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const todo = require('./routes/todo');
const users = require('./routes/users');

const app = express();

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/todos', todo);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({message: err.message});
});

module.exports = app;