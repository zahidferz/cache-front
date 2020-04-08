import GxTextLink from './GxTextLink'

describe('@components/_Core/Buttons/GxTextLink', () => {
  it('exports a valid component', () => {
    expect(GxTextLink).toBeAComponent()
  })
  it('renders slot', () => {
    const slotContent = 'foo'
    const { wrapper } = render(GxTextLink, {
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.element.innerHTML).toContain(slotContent)
  })
})
