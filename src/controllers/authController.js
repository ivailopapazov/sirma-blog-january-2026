import express from 'express';
import authService from '../services/authService.js';

const authController = express.Router();

// GET /login
authController.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect('/posts');
    }

    res.render('auth/login', { title: 'Login' });
});

// POST /login
authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password);
        res.cookie('userId', user.id, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.redirect('/posts');
    } catch (error) {
        res.render('auth/login', {
            title: 'Login',
            error: error.message,
            email
        });
    }
});

// GET /register
authController.get('/register', (req, res) => {
    if (req.user) {
        return res.redirect('/posts');
    }
    res.render('auth/register', { title: 'Register' });
});

// POST /register
authController.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render('auth/register', {
            title: 'Register',
            error: 'Passwords do not match',
            username,
            email
        });
    }

    // try {
    //     const user = await authService.register(username, email, password);
    //     res.cookie('userId', user.id, {
    //         httpOnly: true,
    //         maxAge: 7 * 24 * 60 * 60 * 1000
    //     });
    //     res.redirect('/posts');
    // } catch (error) {
    //     res.render('auth/register', {
    //         title: 'Register',
    //         error: error.message,
    //         username,
    //         email
    //     });
    // }
});

// GET /logout
authController.get('/logout', (req, res) => {
    res.clearCookie('userId');
    res.redirect('/login');
});

export default authController;
