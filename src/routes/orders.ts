import express from 'express';

const router = express.Router();

router.get('/orders/:userId');

//Add a filter to say "groupby userId"
router.get('/orders');