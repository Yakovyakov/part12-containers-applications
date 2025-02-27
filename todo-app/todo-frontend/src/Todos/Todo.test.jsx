/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'

import Todo from './Todo'


describe('Todo component tests', () => {
  let container
  beforeEach(() => {
    const todo = {
      id: '1234',
      text: 'text value',
      done: false,
    }
    container = render(<Todo todo={todo}/>).container
  })
  describe('Todo Tests, step 1', () => {
    test('text is visible', () => {
      let element = screen.getByText('text value')

      expect(element).toBeDefined()
      expect(element).toBeVisible()
      element = screen.getByText('This todo is not done')
      expect(element).toBeDefined()
      expect(element).toBeVisible()

    })
  })
})