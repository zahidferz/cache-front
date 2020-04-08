import Welcome from './welcome'
// You can use RouterLinkStub component to find a router-link component in the render tree.
import { RouterLinkStub } from '@vue/test-utils'

describe('@views/Welcome', () => {
  xit('renders a "REGISTRARME" button', () => {
    const { getByText } = render(Welcome, {
      stubs: ['RouterLink', 'RouterView'],
    })
    const registerBtn = getByText(/Registrarme/i)
    expect(registerBtn).toBeTruthy()
  })
  xit('renders a "iniciar sesión" button', () => {
    const { getByText } = render(Welcome, {
      stubs: ['RouterLinkStub', 'RouterLink'],
    })
    const signInBtn = getByText('iniciar sesión')
    expect(signInBtn).toBeTruthy()
  })
  xit(`Has value { name: 'login' } in router-link 'iniciar sesión'`, () => {
    const { wrapper } = render(Welcome, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    })
    const login = wrapper.findAll(RouterLinkStub).at(1)
    expect(login.props().to).toEqual({
      name: 'login',
    })
  })

  xit(`Has value { name: 'signup' } in router-link 'Registrarme'`, () => {
    const { wrapper } = render(Welcome, {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    })
    const signup = wrapper.findAll(RouterLinkStub).at(0)
    expect(signup.props().to).toEqual({
      name: 'signup',
    })
  })
})
