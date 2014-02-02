/**
 * This is an example on how Sinon can be used to take over the browser's
 * clock.
 *
 * The EggTimer class will execute the callback method that is passed to it
 * after 5 seconds have elapsed. You do not want to slow down your unit
 * test run for 5 seconds. We can use Sinon to fast-forward the clock and
 * run these tests much faster, without having to modify our code.
 *
 * See http://sinonjs.org/docs/#clock for more information
 */
var EggTimer = {
    start: function(cb) {
        setTimeout(cb, 5000);
    }
};

describe('EggTimer', function() {

    before(function() {
    	// Take over the browser's native methods
        this.clock = sinon.useFakeTimers();
    });

    after(function() {
    	// Restore the browser's native methods
        this.clock.restore();
    });

    it('should execute callback after 5 seconds', function() {
    	// Create an anonymous mock that should be called once
        var callback = sinon.mock().once();

        // Pass mock to EggTimer 
        EggTimer.start(callback);

        // Fast-forward time
        this.clock.tick(5001);

        // Verify if mock conditions were met (= if it was called once)
        callback.verify();
    });

});