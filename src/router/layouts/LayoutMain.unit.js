import LayoutMain from './LayoutMain'

describe('@layouts/LayoutMain', () => {
  it('renders its content', () => {
    const slotContent = '<p>Hello!</p>'
    const { element } = shallowMount(LayoutMain, {
      slots: {
        default: slotContent,
      },
    })
    expect(element.innerHTML).toContain(slotContent)
  })
})
