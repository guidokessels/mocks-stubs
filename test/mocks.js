/**
 * Like stubs, mocks are test doubles that can have pre-programmed behaviour. In addition to that
 * they can have built-in expectations. They implement the fully Stub API (and thus the 
 * Spy API) and like stubs will NOT execute the function or method that they wrap.
 *
 * Only use mocks if the built-in expectation may fail your test. If you wouldn't add an assertion
 * for this call, use a stub instead of a mock.
 *
 * See http://sinonjs.org/docs/#mocks for the whole Mock API in Sinon.
 */
describe('mocks', function() {

    // Here's one of the spy examples from spies.js, rewritten to use a mock instead
    it('can be pre-programmed with assertions', function() {
        var pubsub = new PubSub(),
            data   = 'foo',
            mock   = sinon.mock()           // Create an anonymous mock
                          .once()           // Expect it to be called exactly 1 time
                          .withArgs(data);  // Expect the call to have these arguments

        pubsub.subscribe('test', mock);
        pubsub.publish('test', data);

        // Instead of writing a bunch of assertions manually, we only have to verify if
        // the mock's assertions were met.
        mock.verify();
    });

});