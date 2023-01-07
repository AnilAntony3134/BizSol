import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import Solution, { validateMessage } from '../../models/Solution';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const solutions = await Solution.find().sort({ createdAt: 'desc' }).populate('user');
    res.json({
      messages: solutions.map((m) => {
        return m.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id).populate('user');
    if (!solution) return res.status(404).json({ message: 'No message found.' });
    res.json({ message: solution.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let message = await Solution.create({
      solution: req.body.solution,
      problem: req.body.problem,
      organisation: req.body.problem,
      user: req.user.id,
    });
    message = await message.populate('user').execPopulate();

    res.status(200).json({ message: message.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempSolution = await Solution.findById(req.params.id).populate('user');
    if (!(tempSolution.user.id === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'Not the message owner or admin.' });

    const solution = await Solution.findByIdAndRemove(req.params.id).populate('user');
    if (!solution) return res.status(404).json({ message: 'No message found.' });
    res.status(200).json({ solution });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.put('/:id', requireJwtAuth, async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const tempSolution = await Solution.findById(req.params.id).populate('user');
    if (!(tempSolution.user.id === req.user.id || req.user.role === 'ADMIN'))
      return res.status(400).json({ message: 'Not the message owner or admin.' });

    let message = await Solution.findByIdAndUpdate(
      req.params.id,
      { solution: req.body.solution, problem: req.body.problem, user: tempSolution.user.id , organisation: req.body.organisation},
      { new: true },
    );
    if (!message) return res.status(404).json({ message: 'No message found.' });
    message = await message.populate('user').execPopulate();

    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;