import test from 'ava';
import { JSDOM, window, document } from 'jsdom';
import formToJSON from '../form_to_json';

test.beforeEach(t => {
  t.context.$form = new JSDOM(`
  <form action='/api/users/new' method='POST'>
    <input type='hidden' name='csrf_token' value='hoge1234foo4321' />
    <div>
      <input type='text' name='name' value='username' />
      <input type='checkbox' name='alive_flg' checked />
    </div>
    <div>
      <select name='created_user_id'>
        <option value='1'>user 1</option>
        <option value='2' selected>user 2</option>
      </select>
    </div>
    <div>
      <select name='friend_ids[]'>
        <option value='1'>user 1</option>
        <option value='2' selected>user 2</option>
      </select>
      <select name='friend_ids[]'>
        <option value='1' selected>user 1</option>
        <option value='2'>user 2</option>
      </select>
    </div>
    <div>
      <input type='checkbox' name='checkboxes[]'>
      <input type='checkbox' name='checkboxes[]' checked>
      <input type='checkbox' name='checkboxes[]' checked>
      <input type='checkbox' name='checkboxes[]'>
      <input type='checkbox' name='checkboxes[]'>
      <input type='checkbox' name='checkboxes[]' checked>
    </div>
    <div>
      <select name='tags[]'>
        <option value=''>tag 1</option>
        <option value=''>tag 2</option>
      </select>
      <select name='tags[]'>
        <option value=''>tag 1</option>
        <option value=''>tag 2</option>
      </select>
    </div>
  </form>
  `);
});

test('Should be csrf_token is valid', t => {
  const json = formToJSON(t.context.$form.window.document.querySelector('form'));
  t.is(json.csrf_token, 'hoge1234foo4321');
});

test('Should be name is valid', t => {
  const json = formToJSON(t.context.$form.window.document.querySelector('form'));
  t.is(json.name, 'username');
});

test('Should be alive_flg is valid', t => {
  const json = formToJSON(t.context.$form.window.document.querySelector('form'));
  t.is(json.alive_flg, true);
});

test('Should be created_user_id is valid', t => {
  const json = formToJSON(t.context.$form.window.document.querySelector('form'));
  t.is(json.created_user_id, '2');
});

test('Should be user_ids[] is valid', t => {
  const json = formToJSON(t.context.$form.window.document.querySelector('form'));
  t.deepEqual(json.friend_ids, ['2', '1']);
});

test('Should be checkboxes[] is valid', t => {
  const json = formToJSON(t.context.$form.window.document.querySelector('form'));
  t.deepEqual(json.checkboxes, [false, true, true, false, false, true]);
});

test('Should be empty tags[] is valid', t => {
  const json = formToJSON(t.context.$form.window.document.querySelector('form'));
  t.deepEqual(json.tags, []);
});
