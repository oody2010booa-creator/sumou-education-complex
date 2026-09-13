import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Timetables endpoint',
    methods: ['GET /api/timetables', 'POST /api/timetables'],
  });
});

export default router;
