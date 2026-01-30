import express from 'express';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';

import routes from './routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars setup
app.engine('handlebars', engine({
    helpers: {
        eq: (a, b) => a === b,
        formatDate: (date) => new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
}));
app.set('view engine', 'handlebars');
app.set('views', 'src/views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('src/public'));

// Routes
app.use(routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
