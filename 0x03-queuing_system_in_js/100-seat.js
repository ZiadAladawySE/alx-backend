#!/usr/bin/yarn dev
import express from 'express';
import { promisify } from 'util';
import { createQueue } from 'kue';
import { createClient } from 'redis';

const app = express();
const cl = createClient({ name: 'reserve_seat' });
const queue = createQueue();
const INITIAL_SEATS_COUNT = 50;
let reservationEnabled = false;
const PORT = 1245;
const reserveSeat = async (number) => {return promisify(cl.SET).bind(cl)('available_seats', number);};
const getCurrentAvailableSeats = async () => {return promisify(cl.GET).bind(cl)('available_seats');};
app.get('/available_seats', (_, res) => {
  getCurrentAvailableSeats()
    .then((numberOfAvailableSeats) => {res.json({ numberOfAvailableSeats })});});
app.get('/reserve_seat', (_req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservation are blocked' });
    return;
  }
  try {
    const jobdata = queue.create('reserve_seat');
    jobdata.on('failed', (err) => {
      console.log(
        'Seat reservation job',
        jobdata.id,
        'failed:',
        err.message || err.toString(),
      );
    });
    jobdata.on('complete', () => {
      console.log(
        'Seat reservation job',
        jobdata.id,
        'completed'
      );
    });
    jobdata.save();
    res.json({ status: 'Reservation in process' });
  } catch {
    res.json({ status: 'Reservation failed' });
  }
});
app.get('/process', (_req, res) => {
  res.json({ status: 'Queue processing' });
  queue.process('reserve_seat', (_job, done) => {
    getCurrentAvailableSeats()
      .then((result) => Number.parseInt(result || 0))
      .then((availableSeats) => {
        reservationEnabled = availableSeats <= 1 ? false : reservationEnabled;
        if (availableSeats >= 1) {
          reserveSeat(availableSeats - 1)
            .then(() => done());
        } else {
          done(new Error('Not enough seats available'));
        }});});});
const resetAvailableSeats = async (initialSeatsCount) => {
  return promisify(cl.SET)
    .bind(cl)('available_seats', Number.parseInt(initialSeatsCount));};
app.listen(PORT, () => {
  resetAvailableSeats(process.env.INITIAL_SEATS_COUNT || INITIAL_SEATS_COUNT)
    .then(() => {
      reservationEnabled = true;
      console.log(`API available on localhost port ${PORT}`);});});
export default app;
