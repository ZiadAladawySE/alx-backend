#!/usr/bin/yarn dev
import { Queue, Job } from 'kue';

export const createPushNotificationsJobs = (jobs, queue) => {
  if (!(jobs instanceof Array)) {
    throw new Error('Jobs is not an array');
  }
  for (const jobInfo of jobs) {
    const jobdata = queue.create('push_notification_code_3', jobInfo);
    jobdata.on('enqueue', () => {console.log('Notification job created:', jobdata.id);})
    jobdata.on('complete', () => {console.log('Notification job', jobdata.id, 'completed');})
    jobdata.on('failed', (err) => {console.log('Notification job', jobdata.id, 'failed:', err.message || err.toString());})
    jobdata.on('progress', (progress, _data) => {console.log('Notification job', jobdata.id, `${progress}% complete`);});
    jobdata.save();}};
export default createPushNotificationsJobs;
