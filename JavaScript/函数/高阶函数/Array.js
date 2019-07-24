// every() 方法可以判断数组的 所有 元素是否满足测试条件(所有)

// 例如，给定一个包含若干字符串的数组，判断所有字符串是否满足指定的测试条件：
var arr = ['Apple', 'pear', 'orange'];
console.log(arr.every(function(s) {
    return s.length > 0;
}))

console.log(arr.every(function(s) {
    return s.toLowerCase() === s;
}))


// find() 方法用于查找符合条件的第一个元素，如果找到了，返回这个元素，否则，返回undefined：
console.log(arr.find(function (s) {
    return s.toLowerCase() === s;
}))

console.log(arr.find(function (s) {
    return s.toUpperCase() === s;
}))

// findIndex()和find()类似，也是查找符合条件的第一个元素，
// 不同之处在于findIndex()会返回这个元素的索引，如果没有找到，返回-1：

console.log(arr.findIndex(function (s) {
    return s.toLowerCase() === s;
}))

arr.forEach(function(x) {
    console.log(x.length);
})