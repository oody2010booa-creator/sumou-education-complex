import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Subjects endpoint',
    methods: ['GET /api/subjects', 'POST /api/subjects'],
  });
});

export default router;
