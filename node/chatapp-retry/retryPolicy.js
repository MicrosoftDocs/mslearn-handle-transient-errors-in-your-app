var method = retryPolicy.prototype;
var config = require('./appsettings.json');
const shared = new Int32Array(new SharedArrayBuffer(4));

// Constructor
function retryPolicy() {
    this._currentTries = 0;
}

method.checkRetries = function() {
    this._currentTries = this._currentTries + 1;
    console.log('Retrying: ' + this._currentTries);

    // Use a delay if this isn't the first try
    if (this._currentTries != 1)
    {
        Atomics.wait(shared, 0, 0, config.delay);
    }

    if (this._currentTries < config.number_of_retries) {
        return true;
    } else {
        return false;
    }
};

// export the class
module.exports = retryPolicy;