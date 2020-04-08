import SignupYoureInCard from './SignupYoureInCard'

describe('@components/SignupYourInCard', () => {
  it('exports a valid component', () => {
    expect(SignupYoureInCard).toBeAComponent()
  })
  xit('calls router with taxInfo', async () => {
    const $router = {
      push: jest.fn(),
    }
    const { wait } = render(SignupYoureInCard, {
      stubs: ['Portal'],
      mocks: {
        $router,
      },
    })
    await wait(() => expect($router.push).toHaveBeenCalled())
  })
})
