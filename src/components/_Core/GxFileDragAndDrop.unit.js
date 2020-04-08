// import { render, fireEvent, wait } from '@testing-library/vue'
import GxFileDragAndDrop from './GxFileDragAndDrop'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/GxFileDragAndDrop', () => {
  it('exports a valid component', () => {
    expect(GxFileDragAndDrop).toBeAComponent()
  })
})
