import {authMiddleware} from '../../lib/authMiddleware';

/**
 * Protected dashboard API
 * - Only accessible by authenticated users
 */
const handler = async (req, res) => {
    res.status(200).json({message: 'welcome to your dashboard', user: req.user})
};

export default authMiddleware(handler);