#!/usr/bin/yarn dev
import { createQueue, Job } from 'kue';

const BLACKLISTED_NUMBERS = ['4153518780', '4153518781'];
const queue = createQueue();

const sendNotification = (phoneNumber, message, job, done) => {
  let total = 2, waiting = 2;
  let sendInterval = setInterval(() => {
    if (total - waiting <= total / 2) {
      job.progress(total - waiting, total);
    }
    if (BLACKLISTED_NUMBERS.includes(phoneNumber)) {
      done(new Error(`Phone number ${phoneNumber} is blacklisted`));
      clearInterval(sendInterval);
      return;
    }
    if (total === waiting) {
      console.log(
        `Sending notification to ${phoneNumber},`,
        `with message: ${message}`,
      );
    }
    --waiting || done();
    waiting || clearInterval(sendInterval);}, 1000);};
queue.process('push_notification_code_2', 2, (job, done) => {sendNotification(job.data.phoneNumber, job.data.message, job, done);});
