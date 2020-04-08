import GxCardCore from './GxCardCore'

describe('@components/Cards/GxCardCore', () => {
  it('exports a valid component', () => {
    expect(GxCardCore).toBeAComponent()
  })
  it('renders slot', () => {
    const slotContent = '<h1>foo</h1>'
    const { wrapper } = render(GxCardCore, {
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.element.innerHTML).toContain(slotContent)
  })
})
