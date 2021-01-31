const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require('../src/math')

test('Calculate tip', () => {
  const total = calculateTip(10, 0.3)
  expect(total).toBe(13)
})

test('calculate tip for default value', () => {
  const total = calculateTip(10)
  expect(total).toBe(12.5)
})

test('Should convert 32 F to 0 C', () => {
  expect(fahrenheitToCelsius(32)).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
  expect(celsiusToFahrenheit(0)).toBe(32)
})

// test('Test async code', (done) => {
//   setTimeout(() => {
//     expect(1).toBe(2)
//     done()
//   }, 2000)
// })

test('Test async code', async () => {
  const sum = await add(1, 2)
  expect(sum).toBe(3)
})

test('Async test with promise', (done) => {
  add(2, 4).then((sum) => {
    expect(sum).toBe(6)
    done()
  })
})
