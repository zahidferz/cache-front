import ResizeProfilePhoto from './ResizeProfilePhoto'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/ResizeProfilePhoto', () => {
  it('exports a valid component', () => {
    expect(ResizeProfilePhoto).toBeAComponent()
  })
  it('calls mutation when GUARDAR is clicked', async () => {
    const mutate = jest.fn()
    const { getByText, fireEvent, wait } = render(ResizeProfilePhoto, {
      stubs: ['GxTextLink', 'Portal'],
      mocks: {
        $apollo: {
          mutate,
        },
      },
      propsData: {
        imageSrc: '@src/assets/images/Storybook/bancoexample.png',
      },
    })
    const saveBtn = getByText('Guardar')
    await fireEvent.click(saveBtn)
    wait(() => {
      expect(mutate).toHaveBeenCalledTimes(1)
    })
  })
})
