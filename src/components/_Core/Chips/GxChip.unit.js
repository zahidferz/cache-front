import GxChip from './GxChip'

describe('@components/GxChip', () => {
  it('exports a valid component', () => {
    expect(GxChip).toBeAComponent()
  })
  it('renders slot', () => {
    const slotContent = 'foo'
    const { wrapper } = render(GxChip, {
      slots: {
        default: slotContent,
      },
    })
    expect(wrapper.element.innerHTML).toContain(slotContent)
  })
  it('renders with icon', () => {
    const slotContent = 'Chip Text'
    const iconLeft = 'cloud_upload'
    const { wrapper, getByTestId } = render(GxChip, {
      propsData: {
        iconLeft,
      },
      slots: {
        default: slotContent,
      },
    })
    expect(getByTestId('gxChipiconLeft')).toBeTruthy()
    expect(wrapper.element.innerHTML).toContain(slotContent)
  })
})
