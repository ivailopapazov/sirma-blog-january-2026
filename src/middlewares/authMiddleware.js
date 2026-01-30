
// Simple cookie-based auth middleware
export const authMiddleware = async (req, res, next) => {
    const userId = req.cookies.userId;

    if (!userId) {
        req.user = null;
        res.locals.user = null;
        return next();
    }

    try {
        const user = await authService.getUserById(parseInt(userId));
        req.user = user;
        res.locals.user = user;
    } catch (error) {
        req.user = null;
        res.locals.user = null;
    }

    next();
};

// Require authentication
export const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    next();
};
