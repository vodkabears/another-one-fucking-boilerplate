import { expect } from 'chai';
import nock from 'nock';
import fetch from 'node-fetch';
import FormData from 'form-data';
import API from 'lib/api';

const HOST = 'http://test';
const PATH = '/api/component';
const GATE = HOST + PATH;

describe('API', () => {
  beforeEach(() => {
    global.FormData = FormData;
    global.fetch = fetch;
  });

  afterEach(() => {
    delete global.FormData;
    delete global.fetch;

    nock.cleanAll();
  });

  describe('.getQueryString(path, query)', () => {
    it('should return a correct path if query params are undefined', () => {
      expect(API.getQueryString(GATE)).to.be.equal(GATE);
    });

    it('should return a path with query params', () => {
      expect(API.getQueryString(GATE, {
        id: [1, 2],
        text: 'test'
      })).to.be.equal(`${GATE}?id=1&id=2&text=test`);
    });
  });

  describe('.get(path, query)', () => {
    it('should send a GET request with a correct url', () => {
      nock(HOST)
        .get(PATH)
        .reply(200, {});

      return API.get(GATE);
    });

    it('should send a GET request with correct query params', () => {
      let query = { id: [1, 2] };

      nock(HOST)
        .get(PATH)
        .query(query)
        .reply(200, {});

      return API.get(GATE, query);
    });

    it('should return correct received data', () => {
      let reply = { text: 'test' };

      nock(HOST)
        .get(PATH)
        .reply(200, reply);

      return API.get(GATE)
        .then(data => expect(data).to.be.deep.equal(reply));
    });
  });

  describe('.create(path, data)', () => {
    it('should send a POST request with a correct url', () => {
      nock(HOST)
        .post(PATH)
        .reply(200, {});

      return API.create(GATE);
    });

    it('should send FormData', () => {
      let formData = new FormData();

      formData.append('text', 'test');

      nock(HOST)
        .post(PATH, body => body.includes('form-data; name="text"') && body.includes('test'))
        .reply(200, {});

      return API.create(GATE, formData);
    });

    it('should send JSON', () => {
      let data = { text: 'test' };

      nock(HOST)
        .post(PATH, data)
        .reply(200, {});

      return API.create(GATE, data);
    });

    it('should return correct received data', () => {
      let reply = { text: 'test' };

      nock(HOST)
        .post(PATH)
        .reply(200, reply);

      return API.create(GATE)
        .then(data => expect(data).to.be.deep.equal(reply));
    });
  });

  describe('.update(path, update, query)', () => {
    it('should send a PUT request with a correct url', () => {
      nock(HOST)
        .put(PATH)
        .reply(200, {});

      return API.update(GATE);
    });

    it('should send a PUT request with correct query params', () => {
      let query = { id: [1, 2] };

      nock(HOST)
        .put(PATH)
        .query(query)
        .reply(200, {});

      return API.update(GATE, null, query);
    });

    it('should send FormData', () => {
      let formData = new FormData();

      formData.append('text', 'test');

      nock(HOST)
        .put(PATH, body => body.includes('form-data; name="text"') && body.includes('test'))
        .reply(200, {});

      return API.update(GATE, formData);
    });

    it('should send JSON', () => {
      let update = { text: 'test' };

      nock(HOST)
        .put(PATH, update)
        .reply(200, {});

      return API.update(GATE, update);
    });

    it('should return correct received data', () => {
      let reply = { text: 'test' };

      nock(HOST)
        .put(PATH)
        .reply(200, reply);

      return API.update(GATE)
        .then(data => expect(data).to.be.deep.equal(reply));
    });
  });

  describe('.remove(path, query)', () => {
    it('should send a DELETE request with a correct url', () => {
      nock(HOST)
        .delete(PATH)
        .reply(200, {});

      return API.remove(GATE);
    });

    it('should send a DELETE request with correct query params', () => {
      let query = { id: [1, 2] };

      nock(HOST)
        .delete(PATH)
        .query(query)
        .reply(200, {});

      return API.remove(GATE, query);
    });

    it('should return correct received data', () => {
      let reply = { text: 'test' };

      nock(HOST)
        .delete(PATH)
        .reply(200, reply);

      return API.remove(GATE)
        .then(data => expect(data).to.be.deep.equal(reply));
    });
  });
});
