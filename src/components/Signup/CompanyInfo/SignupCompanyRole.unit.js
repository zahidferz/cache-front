import SignupCompanyRole from './SignupCompanyRole'
import GxCardCore from '@src/components/_Core/Cards/GxCardCore'
import { axiosAccountProvisioning } from '@src/axiosConfig'

const postMock = jest.fn(() => Promise.resolve(true))
jest.mock('@src/axiosConfig')
jest.spyOn(axiosAccountProvisioning, 'post').mockImplementation(postMock)

describe('@components/SignupCompanyRole', () => {
  it('exports a valid component', () => {
    expect(SignupCompanyRole).toBeAComponent()
  })
  xit('calls pickRole on card selection', () => {
    const pickRole = jest.fn()
    const $route = {
      query: {
        contador: false,
      },
    }
    const { getByText, fireEventAsync, wrapper } = render(SignupCompanyRole, {
      methods: {
        pickRole,
      },
      mocks: {
        $route,
      },
    })
    const cardSelection = getByText('Soy dueño')
    fireEventAsync.click(cardSelection)
    expect(pickRole).toHaveBeenCalled()
    expect(pickRole).toBeCalledWith(wrapper.vm.options[0].role)
  })
  xit('Redirects to dashboard after a guest picks a role', async () => {
    const $route = {
      query: {
        invitado: true,
      },
    }
    const $router = {
      push: jest.fn(),
    }
    const $apollo = {
      mutate: jest.fn(),
    }
    const { wrapper, wait } = render(SignupCompanyRole, {
      stubs: ['SignupYoureInCard'],
      mocks: {
        $route,
        $router,
        $apollo,
      },
      data() {
        return {
          user: {
            number: 123,
          },
          company: {
            number: 456,
          },
          subscription: {
            number: 789,
          },
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
        }
      },
    })
    const cardSelection = wrapper.findAll(GxCardCore).at(0)
    cardSelection.trigger('click')
    await wait(() => {
      expect(wrapper.vm.guestSignup).toBe(true)
    })
  })
})
