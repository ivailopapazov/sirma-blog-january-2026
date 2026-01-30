
import express from 'express';
import authController from './controllers/authController.js';
import postController from './controllers/postController.js';
import commentController from './controllers/commentController.js';

const routes = express.Router();

// Home redirect
routes.get('/', (req, res) => {
    res.send('Welcome to the Home Page! Go to /posts to see all posts.');
    // res.redirect('/posts');
});

routes.use('/', authController);
routes.use('/posts', postController);
routes.use('/comments', commentController);

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
