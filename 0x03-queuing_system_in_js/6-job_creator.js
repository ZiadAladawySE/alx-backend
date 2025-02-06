#!/usr/bin/yarn dev
import { createQueue } from 'kue';

const queue = createQueue({name: 'push_notification_code'});
const jobdata = queue.create('push_notification_code', {
  phoneNumber: '07045679939',
  message: 'Account registered'});
jobdata.on('enqueue', () => {console.log('Notification job created:', jobdata.id);})
jobdata.on('complete', () => {console.log('Notification job completed');})
jobdata.on('failed attempt', () => {console.log('Notification job failed');});
jobdata.save();
