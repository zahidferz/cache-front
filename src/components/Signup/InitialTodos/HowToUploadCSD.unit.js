import HowToUploadCSD from './HowToUploadCSD'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/HowToUploadCSD', () => {
  it('exports a valid component', () => {
    expect(HowToUploadCSD).toBeAComponent()
  })
  // it calls toUploadCer when Subirlo yo is clicked
  it('calls toUploadCer when Subirlo yo is clicked', async () => {
    const toUploadCer = jest.fn()
    const { fireEvent, getByText, wait } = render(HowToUploadCSD, {
      methods: {
        toUploadCer,
      },
      stubs: ['RouterLink'],
      data() {
        return {
          myAccount: {
            userNumber: 1,
            jobTitle: '',
            companies: [
              {
                company: {
                  companyNumber: 12,
                },
              },
            ],
          },
        }
      },
    })

    await fireEvent.click(getByText('Subirlos yo'))
    await wait(() => {
      expect(toUploadCer).toHaveBeenCalledTimes(1)
    })
  })
  // it calls toSendSos when Pedírselo al contador is clicked
  it('calls toSendSos when Pedírselo al contador is clicked', async () => {
    const toSendSos = jest.fn()
    const { fireEvent, getByText, wait } = render(HowToUploadCSD, {
      methods: {
        toSendSos,
      },
      stubs: ['RouterLink'],
      data() {
        return {
          myAccount: {
            userNumber: 1,
            jobTitle: '',
            companies: [
              {
                company: {
                  companyNumber: 12,
                },
              },
            ],
          },
        }
      },
    })
    await fireEvent.click(getByText('Pedírselo al contador'))
    await wait(() => {
      expect(toSendSos).toHaveBeenCalledTimes(1)
    })
  })
  it('calls toSendSos when Solicitarlo a mi equipo is clicked', async () => {
    const toSendSos = jest.fn()
    const { fireEvent, getByText, wait } = render(HowToUploadCSD, {
      methods: {
        toSendSos,
      },
      stubs: ['RouterLink'],
      data() {
        return {
          myAccount: {
            userNumber: 1,
            jobTitle: 'Contador',
            companies: [
              {
                company: {
                  companyNumber: 12,
                },
              },
            ],
          },
        }
      },
    })

    await fireEvent.click(getByText('Solicitarlo a mi equipo'))
    await wait(() => {
      expect(toSendSos).toHaveBeenCalledTimes(1)
    })
  })
})
