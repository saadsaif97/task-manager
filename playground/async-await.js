const sum = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        reject('Please enter the positive numbers')
      }

      resolve(a + b)
    }, 1000)
  })
}

// sum(1, -2)
//   .then((result) => {
//     console.log(result)
//   })
//   .catch((err) => console.log(err))

async function doWork() {
  let sum1 = await sum(1, 99)
  let sum2 = await sum(sum1, 50)
  let sum3 = await sum(sum2, 3)
  return sum3
}

doWork()
  .then((result) => console.log(result))
  .catch((err) => console.log(err))
