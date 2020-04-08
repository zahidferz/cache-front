import GxAddressGoogleMaps from './GxAddressGoogleMaps'
jest.mock('../../../utils/google-maps.js')

describe('@components/Forms/GxAddressGoogleMaps', () => {
  it('exports a valid component', () => {
    expect(GxAddressGoogleMaps).toBeAComponent()
  })
  xit('emits a validAddress event when performing a search', async () => {
    const { fireEvent, getByLabelText, wait, getByText } = render(
      GxAddressGoogleMaps,
      {
        propsData: {
          value: '',
          placeholder: 'Dirección',
          label: 'Dirección',
          iconRight: 'expand_more',
        },
      }
    )

    getByLabelText('Dirección').value = 'Reforma 222'
    await fireEvent.input(getByLabelText('Dirección'))

    await wait(() => expect(getByText('Alpha')).toBeTruthy())
  })
})
