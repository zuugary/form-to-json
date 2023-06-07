# form_to_json

form value is to be JSON.

# Installation

```zsh
npm i --save form_to_json
```

# Usage

```js
import formToJSON from 'form_to_json';

const $form = document.querySelector('form');
const json = formToJSON($form);
axios({
  url: '/api/example',
  method: 'POST',
  data: json
})
.then(res => console.log(res))
.catch(err => console.error(err));
```

# What is different from other formToJSON?

It is difficult to get multiple values.
This module can easily be obtained by attaching `[]` such as `user_ids []`.

For example.

```html
<select name='friend_ids[]'>
  <option value='1'>Jack</option>
  <option value='2' checked>Tom</option>
</select>
<select name='friend_ids[]'>
  <option value='1' checked>Ada</option>
  <option value='2'>Karen</option>
</select>
```

```js
const json = formToJSON($form);
// => json.friend_ids = ['2', '1']
```
