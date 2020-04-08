import GxClientCard from './GxClientCard'

describe('@components/GxClientCard', () => {
  it('exports a valid component', () => {
    expect(GxClientCard).toBeAComponent()
  })
  it('shows client commercialName and taxId', () => {
    const { getByText } = render(GxClientCard, {
      propsData: {
        commercialName: 'Nombre Comercial',
        taxId: 'GADP9101076U1',
      },
    })
    expect(getByText('Nombre Comercial')).toBeTruthy()
    expect(getByText('GADP9101076U1')).toBeTruthy()
    expect(getByText('NC')).toBeTruthy()
  })
})
