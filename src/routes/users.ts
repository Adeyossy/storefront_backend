import express from 'express';

const router = express.Router();

router.get('/users');

router.get('/users/userId');

router.post('/users');

export default router;