/**
 * Spies are the least complex test doubles. They can wrap an existing function or method
 * and record all calls made to it. They do not affect the original function or 
 * method in any way.
 *
 * Here we use a very basic PubSub implementation as an example.
 *
 * See http://sinonjs.org/docs/#spies for the whole Spy API in Sinon.
 */
function PubSub() {
    var topics = {};

    return {
        subscribe: function(topic, callback) {
            if (!topics[topic]) {
                topics[topic] = [];
            }
            topics[topic].push(callback);
        },
        publish: function(topic, data) {
            if (topics[topic]) {
                topics[topic].forEach(function(fn) {
                    fn(data);
                });
            }
        }
    }
}

describe('spies', function() {

    it('will record calls made to it', function() {
        var pubsub = new PubSub(),
            spy    = sinon.spy();

        pubsub.subscribe('test', spy);
        pubsub.publish('test', 'foo');

        expect(spy.called).to.equal(true);
        expect(spy.firstCall.args[0]).to.equal('foo');
    });

    it('will not affect the original method', function() {
        var pubsub   = new PubSub(),
            callback = function() { throw "Oh hai!" },
            spy      = sinon.spy(callback);

        pubsub.subscribe('test', spy);

        expect(function() {
            // This will still throw an error, as spies do not affect
            // the method they wrap!
            pubsub.publish('test', 'foo');
        }).to.throwException(/Oh hai!/);
    });

});