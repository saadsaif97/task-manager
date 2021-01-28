const obj = {
  cat: 'ding',
}

obj.toJSON = function () {
  // this is called automatically by the express when route is accessed
  // we can manipulate the data coming back from the object
  console.log(this)
  return this
}

console.log(JSON.stringify(obj))
