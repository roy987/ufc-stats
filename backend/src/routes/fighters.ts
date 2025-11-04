import { Router, Request, Response } from 'express';
import { fighters } from '../data/fighters';

const router = Router();

// Get all fighters
router.get('/', (req: Request, res: Response) => {
  res.json(fighters);
});

// Get fighter by ID
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const fighter = fighters.find((f) => f.id === id);

  if (!fighter) {
    return res.status(404).json({ error: 'Fighter not found' });
  }

  res.json(fighter);
});

// Get fighters by weight class
router.get('/weight-class/:weightClass', (req: Request, res: Response) => {
  const weightClass = req.params.weightClass;
  const fightersByClass = fighters.filter(
    (f) => f.weightClass.toLowerCase() === weightClass.toLowerCase()
  );

  res.json(fightersByClass);
});

export default router;
