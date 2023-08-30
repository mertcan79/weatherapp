const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/index');

chai.use(chaiHttp);
const { expect } = chai;

describe('Weather API', () => {
  let server;

  before((done) => {
    server = app.listen(0, done); // Listen on a random port
  });

  after(() => {
    server.close();
  });
  // Valid request
  it('should get weather data for a valid location', (done) => {
    const latitude = 37.7749;
    const longitude = -122.4194;

    chai.request(server) // Use the server instance for the request
      .get(`/forecast?lat=${latitude}&lon=${longitude}`)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');

          // Additional assertions
          const forecast = res.body;
          expect(forecast).to.have.lengthOf.at.most(40); // Maximum 10 items
          forecast.forEach((item) => {
            expect(item).to.have.property('dt_txt');
            expect(item).to.have.property('main');
            expect(item).to.have.property('weather');
          });

          done();
        }
      });
  }).timeout(7000);
  // Invalid requests
  it('should handle invalid location', (done) => {
    const latitude = 1000; // Invalid latitude
    const longitude = -2000; // Invalid longitude

    chai.request(server)
      .get(`/forecast?lat=${latitude}&lon=${longitude}`)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.is.empty;

          done();
        }
      });
  }).timeout(7000);

  it('should handle missing latitude or longitude', (done) => {
    chai.request(server)
      .get('/forecast') // Missing lat and lon
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.is.empty;

          done();
        }
      });
  }).timeout(7000);
});
