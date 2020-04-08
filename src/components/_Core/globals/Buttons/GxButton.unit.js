import GxButton from './GxButton'

describe('@components/_Core/Buttons/GxButton', () => {
  it('exports a valid component', () => {
    expect(GxButton).toBeAComponent()
  })
  it('renders slot', () => {
    const slotContent = 'foo'
    const { wrapper } = render(GxButton, {
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.element.innerHTML).toContain(slotContent)
  })
})
