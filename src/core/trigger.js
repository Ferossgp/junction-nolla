function youHaventSeenThis(){
   return Math.floor(Math.random() * 1000000) + 1;
}

function createTrigger() {
  var trigger = function() {
    trigger.id = youHaventSeenThis();
    trigger.subscribers.forEach(function(subscriber) {
      subscriber();
    });
  };
  trigger.id = youHaventSeenThis();
  trigger.subscribers = [];

  trigger.subscribe = function(f) {
    trigger.subscribers.push(f);
  };

  trigger.unsubscribe = function(f) {
    trigger.subscribers.indexOf(f) >= 0 &&
      trigger.subscribers.splice(trigger.subscribers.indexOf(f), 1);
  };

  return trigger;
}

export default createTrigger;