
import express from 'express';

const routes = express.Router();

// Home redirect
routes.get('/', (req, res) => {
    res.send('Welcome to the Home Page! Go to /posts to see all posts.');
    // res.redirect('/posts');
});

// 404 handler
routes.use((req, res) => {
    res.status(404).render('error', { message: 'Page not found' });
});

// Error handler
routes.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { message: 'Something went wrong!' });
});

export default routes;
