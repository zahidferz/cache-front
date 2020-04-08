import UploadCSDSummary from './UploadCSDSummary'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/UploadCSDSummary', () => {
  it('exports a valid component', () => {
    expect(UploadCSDSummary).toBeAComponent()
  })
  it('calls $router.push when CONTINUAR is clicked', async () => {
    const $route = {
      name: 'howtouploadcsd',
    }
    const { fireEvent, getByText, wait, wrapper } = render(UploadCSDSummary, {
      stubs: ['RouterLink'],
      mocks: {
        $route,
      },
    })
    await fireEvent.click(getByText('Continuar'))
    await wait(() => {
      expect(wrapper.vm.$route.name).toBe('howtouploadcsd')
    })
  })
})
