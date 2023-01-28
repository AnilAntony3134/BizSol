import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import User from '../../models/User';


const router = Router();

router.put('/:id', requireJwtAuth, async (req, res, next) => {
    console.log(req.body)
    try {
        const updatedUser = { preferences: req.body.preferences, slots: req.body.slots };
        let user = await User.findByIdAndUpdate(
            req.params.id,
            {
                preferences: req.body.preferences, 
                slots: req.body.slots
            },
            { new: true },
        );
        if (!user) return res.status(404).json({ user: 'No user found.' });
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
});

export default router;