
import cors from 'cors';

const ACEPTED_ORIGINS = [
    'http://localhost:3000',
    'https://example.com',
    'http://127.0.0.1:5500'
];

export const corsSchema = ({aceptedOrigins = ACEPTED_ORIGINS} = {}) => cors({
    origin: (origin, callback) => {
        if (aceptedOrigins.includes(origin)) {
            return callback(null, true);
        }else if(!origin) {
            return callback(null, true);
        }

        return callback(new Error('CORS error'));
    }
});