import { describe, it, expect } from 'vitest'
// import { data } from './AddStep'

describe('add', () => {
  const add = (a: number, b: number) => a + b
  it('positiva tal', () => {
    expect(add(1, 3)).toEqual(4)
  })
  it('negativa tal', () => {
    expect(add(-1, -3)).toEqual(-4)
  })
  it('positivt och negativt tal', () => {
    expect(add(1, -3)).toEqual(-2)
  })
  it('negativt och positivt tal', () => {
    expect(add(-1, 3)).toEqual(2)
  })
})

const remainder = (a: number, b: number) => {
  return a % b
}

describe('remainder', () => {
  it('positiva tal', () => {
    expect(remainder(7, 3)).toEqual(1)
  })
})

// describe('AddStep', () => {
//   it('should add two numbers', () => {
//     expect(data).toBeDefined()
//   })
// })
