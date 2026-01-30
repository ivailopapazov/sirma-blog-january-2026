import bcrypt from 'bcrypt';
import userRepository from '../repositories/userRepository.js';

class AuthService {
    async register(username, email, password) {
        // Check if user exists
        const existingEmail = await userRepository.findByEmail(email);
        if (existingEmail) {
            throw new Error('Email already registered');
        }

        const existingUsername = await userRepository.findByUsername(username);
        if (existingUsername) {
            throw new Error('Username already taken');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await userRepository.create({
            username,
            email,
            password: hashedPassword
        });

        return { id: user.id, username: user.username, email: user.email };
    }

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid email or password');
        }

        return { id: user.id, username: user.username, email: user.email };
    }

    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) return null;
        return { id: user.id, username: user.username, email: user.email };
    }
}

export default new AuthService();
