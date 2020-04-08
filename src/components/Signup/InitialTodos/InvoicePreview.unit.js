import InvoicePreview from './InvoicePreview'
jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

describe('@components/InvoicePreview', () => {
  it('exports a valid component', () => {
    expect(InvoicePreview).toBeAComponent()
  })
  xit('calls onSave when icon save is clicked', async () => {
    const onSave = jest.fn()
    const $router = {
      push: jest.fn(),
    }
    const $apollo = {
      query: jest.fn(() =>
        Promise.resolve({
          data: {
            myAccount: {
              companies: {
                company: {
                  companyNumber: 123,
                },
              },
            },
          },
        })
      ),
      mutate: jest.fn(() =>
        Promise.resolve({
          data: {
            companyGetInvoiceDesignPreview: {
              file: '',
            },
          },
        })
      ),
    }
    const { fireEvent, getByTestId, wait } = render(InvoicePreview, {
      stubs: ['router-link'],
      mocks: {
        $apollo,
        $router,
      },
      methods: {
        onSave,
      },
      data() {
        return {
          myAccount: {
            userNumber: 1,
            companies: [
              {
                company: {
                  companyNumber: 12,
                },
              },
            ],
          },
          pdfImage: '',
        }
      },
    })
    await fireEvent.click(getByTestId('gxiconsaveinvoice'))
    await wait(() => {
      expect(onSave).toHaveBeenCalledTimes(1)
    })
  })
})
