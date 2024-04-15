# @pieda/prerender

## 安裝步驟

1. 在 package.json dependencies 加入套件

```json
"@coder/core": "git+ssh://git@github.com:piedasing/-coder-core.git#v{版本號}",

"@coder/core": "file:coder-core-{版本號}.tgz",
```

2. 執行安裝指令

```bash
npm install
```

## 使用方式

main.js or main.ts

```js
import CoderLibrary, { createNotify } from '@coder/core';
import '@coder/core/style.css';

app.use(CoderLibrary);
app.use(createNotify, {});
```

### useBase

```js
import { useBase } from '@coder/core';

const { ww, wh, isMobile, deviceInfo } = useBase();
```

### 設定 Notify 預設值

```js
import { useNotify } from '@coder/core';

const $notify = useNotify();

$notify.setGlobalConfigs({
    iconColor: '#0096FF',
    confirmButtonColor: '#F1341C',
    allowOutsideClick: true,
    allowEscapeKey: false,
});
```

### 其他元件呼叫 Notify

```js
$notify.alert({
    title: '系統通知',
    message: '訊息內容',
    variant: 'success',
});
```

### AJAX 初始化

```js
import { useAjax } from '@coder/core';

const $ajax = useAjax();

$ajax.init({
    baseURL: '<API 網址>',
    /**
     * 開發時的代理網址
     * 非開發環境則不帶，或者帶 null、空字串
     */
    proxyPath: '/proxy-api',
    /**
     * 發送請求的時候，要自動帶的 header
     */
    headers: {
        Authorization: accessToken,
    },
    /**
     * 回應攔截器，可不帶，會預設將回應資料整理成以下格式
     * 成功: [null, response]
     * 失敗: [error, null]
     */
    interceptors: {
        success: (response) => {},
        failure: (response) => {},
    },
});
```

### api.js

```js
export const useApi = () => ({
    getList: () => {
        return $ajax.get('/list');
    },
    postEditData: (payload) => {
        return $ajax.post('/data/edit', payload);
    },
});
```

### 表單驗證

```js
import { useForm } from '@coder/core';

const { formData, $validate, $firstError, $hasError } = useForm({
    data: {
        name: '',
        baby: {
            name: '',
            pic: '',
        },
    },
    rules: (Validator) => ({
        name(value) {
            return Validator.value(value).required('此欄必填').minLength(3, '最少需填寫3個字元');
        },
        'baby.name'(value) {
            return Validator.value(value).required('請輸入寶寶姓名');
        },
    }),
    configs: {
        /**
         * 網頁要被滾動的元素選擇器，預設為 'html'，也可以帶 document.querySelector('html')
         * @params {String | HTMLElement}
         */
        scrollElement: 'html',
        /**
         * 表單元素選擇器，預設為 'form'，也可以帶 document.querySelector('form')
         * * @params {String | HTMLElement}
         */
        formElement: 'form',
        /**
         * 是否要自動滾動到驗證失敗的欄位，預設 true
         * @params {Boolean}
         */
        focusInvalid: true,
        /**
         * 驗證失敗的表單控件自動加上的 class "名稱" (*** 前面沒有 . ***)，預設為 is-invalid
         * @params {String}
         */
        invalidClass: 'is-invalid',
        /**
         * 錯誤訊息的元素選擇器，預設為 '.invalid-feedback'，也可以帶 document.querySelectorAll('.invalid-feedback')
         * @params {String | NodeList}
         */
        errorElement: '.invalid-feedback',
        /**
         * 滾動至驗證失敗欄位時，賦予該元素搖晃的時間 (毫秒)，預設為 800 ms，如果帶 <= 0 則不會搖晃
         * @params {Number}
         */
        shakeDuration: 800,
    },
});

const onSubmit = async () => {
    const success = await $validate();
    if (!success) {
        return;
    }
    console.log(formData);
};
```

## Loaders

```html
<loader-ellipsis :size="'40px'" :color="'#0096ff'"></loader-ellipsis>
<loader-grid :size="'40px'" :color="'#0096ff'"></loader-grid>
<loader-hourglass :size="'40px'" :color="'#0096ff'"></loader-hourglass>
<loader-ring :size="'40px'" :color="'#0096ff'"></loader-ring>
<loader-spinner :size="'40px'" :color="'#0096ff'"></loader-spinner>
```
