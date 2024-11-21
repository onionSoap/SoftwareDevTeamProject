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

describe('Testing Login', () => {
  it('positive : /login', done => {
    chai
      .request(server)
      .post('/login')
      // const {item_id, new_status} = req.body;
      .send({username: 'JohnDoe', password: 'BigTester'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        //console.log("Status in test: ", res.status)
        // console.log("Res.text: ",res.text);
        //expect(res.text).to.include('Item status updated successfully!');
        done();
      });
  });
});

describe('Testing Update Item Status', () => {
  it('positive : /update_item_status', done => {
    chai
      .request(server)
      .patch('/update_item_status')
      // const {item_id, new_status} = req.body;
      .send({user_id: '1', item_id: '1', new_status: 'found'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        //console.log("Res.text: ",res.text);
        expect(res.text).to.include('Item status updated successfully!');
        done();
      });
  });
  it('Negative : /update_item_status. Checking invalid status', done => {
      chai
        .request(server)
        .patch('/update_item_status')
        .send({user_id: '1', item_id: '1', new_status: 'BigTester'})
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equals('Item Status Update Error!');
          done();
        });
    });
    it('Positive : /update_item_status. Checking set to active works', done => {
      chai
        .request(server)
        .patch('/update_item_status')
        .send({user_id: '1', item_id: '2', new_status: 'active'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equals('Item status updated successfully!');
          done();
        });
    });
    it('Positive : /update_item_status. Checking swap to active works', done => {
      chai
        .request(server)
        .patch('/update_item_status')
        .send({user_id: '1', item_id: '1', new_status: 'active'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equals('Item status updated successfully!');
          done();
        });
    });
});

describe('Testing update_timer', () => {
  it('positive : /update_timer', done => {
    chai
      .request(server)
      .patch('/update_timer')
      // const {item_id, new_status} = req.body;
      .send({user_id: '1', current_time: '00:01:02'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        //console.log("Res.text: ",res.text);
        expect(res.text).to.include('Timer was updated successfully!');
        done();
      });
  });
});


// describe('Testing update_is_solved', () => {
//   it('positive : /update_is_solved', done => {
//     chai
//       .request(server)
//       .post('/update_is_solved')
//       // const {item_id, new_status} = req.body;
//       .send({user_id: '1', puzzle_id: '1', current_progress: '0'})
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         //console.log("Res.text: ",res.text);
//         expect(res.text).to.include('Puzzle was solved and progress updated successfully!');
//         done();
//       });
//   });
// });

describe('Testing Logout', () => {
  it('positive : /logout', done => {
    chai
      .request(server)
      .get('/logout')
      // const {item_id, new_status} = req.body;
      // .send({username: 'JohnDoe', password: 'BigTester'})
      .end((err, res) => {
        expect(res).to.have.status(200);
        //console.log("Status in test: ", res.status)
        // console.log("Res.text: ",res.text);
        //expect(res.text).to.include('Logged out successfully!');
        done();
      });
  });
});
