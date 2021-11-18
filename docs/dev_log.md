# errors

## module import

### error message

```
Cannot use import statement outside a module Error
```

### solution

```
<script src="./js/index.js" type="module"></script>
```

script 태그를 위와 같이 type="module"을 명시하여 작성해준다. 그러면 이 스크립트 태그 안에서만 해당 모듈의 변수들에 접근할 수 있다.
다른 script태그에서는 접근 불가능.
