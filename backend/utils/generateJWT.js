import jwt from 'jsonwebtoken';

const generateJsonWebToken = (payload, res) => {
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, { expiresIn: '15d' });

    res.cookie('jwt', token, {
        expire: 1000 * 60 * 60 * 24 * 15,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development'
    })
}

export default generateJsonWebToken