/**
 * Stubs are test doubles with pre-programmed behaviour. They implement the full Spy API, but extend
 * it with their own methods. Unlike spies, they will NOT execute the function or method that they
 * wrap. Instead, you can specify how the stub should respond to each call.
 *
 * Stubs are very handy to test different flows in your code, or to prevent undesireable behaviour
 * to be executed during a test run (e.g. updating a database or doing a HTTP request.)
 *
 * In this example we use a simple User class. This class has a dependency on the Database class to 
 * save its data. During unit test runs you want to limit the interactions with a database as much
 * as possible. There we stub the `Database.save()` method and have it return a pre-defined value.
 * By returning different values in each test we can test if our User class reacts correctly to
 * different scenario's, without ever having to actually interact with a real database.
 *
 * See http://sinonjs.org/docs/#stubs for the whole Stub API in Sinon.
 */
function Database() {
    return {
        save: function(data) {
            // Make connection with database and store data
        }
    }
}
function User(DB) {
    return {
        update: function() {
            return DB.save(this) ? 'success' : 'error';
        }
    }
}

describe('stubs', function() {

    it('should return "error" if user was NOT saved successfully', function() {
        var db   = new Database(),
            user = new User(db);

        // Something went wrong!
        sinon.stub(db, 'save').returns(false);

        expect(user.update()).to.equal('error');
    });

    it('should return "success" if user was saved successfully', function() {
        var db   = new Database(),
            user = new User(db);

        // User was saved successfully
        sinon.stub(db, 'save').returns(true);

        expect(user.update()).to.equal('success');
    });

});