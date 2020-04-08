import SignupLastname from './SignupLastname'
jest.mock('lodash/debounce', () => jest.fn((cb) => cb))

describe('@components/SignupLastname', () => {
  it('exports a valid component', () => {
    expect(SignupLastname).toBeAComponent()
  })
  xit('should display error if name has less than 2 characters', async () => {
    const mutate = jest.fn(() => Promise.resolve({}))
    const user = {
      name: 'Jonh',
    }
    const { fireEvent, getByLabelText, getByText, wait } = render(
      SignupLastname,
      {
        stubs: ['RouterLink', 'RouterView'],
        mocks: {
          user,
          $apollo: {
            mutate,
          },
          $router: jest.fn(),
        },
      }
    )
    const inputLastname = getByLabelText('Apellidos')
    inputLastname.value = 'a'
    fireEvent.input(inputLastname)
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => expect(getByText('Tu apellido es muy corto')).toBeTruthy())
  })
  xit('should display error if user submits form with empty input value', async () => {
    const mutate = jest.fn(() => Promise.resolve({}))
    const user = {
      name: 'Jonh',
    }
    const { fireEvent, getByLabelText, getByText, wait } = render(
      SignupLastname,
      {
        stubs: ['RouterLink', 'RouterView'],
        mocks: {
          user,
          $apollo: {
            mutate,
          },
        },
      }
    )
    const inputLastname = getByLabelText('Apellidos')
    inputLastname.value = ''
    fireEvent.input(inputLastname)
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => expect(getByText('Este campo es necesario')).toBeTruthy())
  })
  xit('should go to next route if lastname is valid', async () => {
    jest.mock('lodash/debounce', () => jest.fn((fn) => fn))

    const mutate = jest.fn(() => Promise.resolve({}))
    const push = jest.fn(() => Promise.resolve({}))
    const user = {
      name: 'Jonh',
    }
    const { fireEvent, getByLabelText, wait } = render(SignupLastname, {
      stubs: ['RouterLink', 'RouterView'],
      mocks: {
        user,
        $apollo: {
          mutate,
        },
        $router: {
          push,
        },
        $route: {
          query: {},
        },
      },
    })
    const inputLastname = getByLabelText('Apellidos')
    inputLastname.value = 'Doe'
    fireEvent.input(inputLastname)

    setTimeout(async () => {
      fireEvent.click(getByLabelText('Guardar'))
      await wait(() => expect(push).toHaveBeenCalled())
    }, 300)
  })
  xit('Calls the mutation function when user submits form', async () => {
    const mutate = jest.fn(() => Promise.resolve({}))
    const { fireEvent, getByLabelText, wait } = render(SignupLastname, {
      stubs: ['RouterLink', 'RouterView'],
      mocks: {
        $apollo: {
          mutate,
        },
        $router: {
          push: jest.fn(),
        },
        $route: {
          query: {
            invite: null,
          },
        },
      },
    })
    const inputLastname = getByLabelText('Apellidos')
    inputLastname.value = 'Doe'
    fireEvent.input(inputLastname)
    fireEvent.click(getByLabelText('Guardar'))
    await wait(() => {
      expect(mutate).toHaveBeenCalled()
    })
  })
})
