'use strict';

onmessage = function(e) {
  console.log('Message received from main script', e);
  postMessage( e.data );
};