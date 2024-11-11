// ********************** Initialize server **********************************

const server = require('../src/index.js'); //DONE: Make sure the path to your index.js is correctly added

// ********************** Import Libraries ***********************************

const chai = require('chai'); // Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

// ********************** DEFAULT WELCOME TESTCASE ****************************

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/welcome')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals('success');
        assert.strictEqual(res.body.message, 'Welcome!');
        done();
      });
  });
});

// *********************** TODO: WRITE 2 UNIT TESTCASES **************************

// Example Positive Testcase :
// API: /add_user
// Input: {id: 5, name: 'John Doe', dob: '2020-02-20'}
// Expect: res.status == 200 and res.body.message == 'Success'
// Result: This test case should pass and return a status 200 along with a "Success" message.
// Explanation: The testcase will call the /add_user API with the following input
// and expects the API to return a status of 200 along with the "Success" message.

describe('Testing Add User Account', () => {
  it('positive : /register', done => {
    chai
      .request(server)
      .post('/register')
      .send({username: 'JohnDoe', password: 'BigTester'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        // console.log("Res.text: ", res.text)
        expect(res.text).to.include('Registration Successful!');
        done();
      });
  });
  it('Negative : /register. Checking invalid name', done => {
      chai
        .request(server)
        .post('/register')
        .send({username: 'JohnDoe', password: 'BigTester'})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.include('Registration Error!');
          done();
        });
    });
});

describe('Testing Update Item Status', () => {
  it('positive : /update_item_status', done => {
    chai
      .request(server)
      .post('/update_item_status')
      // const {item_id, new_status} = req.body;
      .send({item_id: '1', new_status: 'found'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        // console.log("Res.text: ", res.text)
        expect(res.text).to.include('Item status updated successfully!');
        done();
      });
  });
  it('Negative : /update_item_status. Checking invalid status', done => {
      chai
        .request(server)
        .post('/update_item_status')
        .send({item_id: '1', new_status: 'BigTester'})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.include('Item Status Update Error!');
          done();
        });
    });
});

//We are checking POST /add_user API by passing the user info in in incorrect manner (name cannot be an integer). This test case should pass and return a status 400 along with a "Invalid input" message.

// describe('Testing Add User Account', () => {
//   it('positive : /register', done => {
//     // Refer above for the positive testcase implementation
//   });

//   // Example Negative Testcase :
//   // API: /add_user
//   // Input: {id: 5, name: 10, dob: '2020-02-20'}
//   // Expect: res.status == 400 and res.body.message == 'Invalid input'
//   // Result: This test case should pass and return a status 400 along with a "Invalid input" message.
//   // Explanation: The testcase will call the /add_user API with the following invalid inputs
//   // and expects the API to return a status of 400 along with the "Invalid input" message.
//   it('Negative : /register. Checking invalid name', done => {
//     chai
//       .request(server)
//       .post('/register')
//       .send({username: 10, password: 'BigTester'})
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         expect(res.body.message).to.equals('Invalid input');
//         done();
//       });
//   });
// });

// ********************************************************************************
