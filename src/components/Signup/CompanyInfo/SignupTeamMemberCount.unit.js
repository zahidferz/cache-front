import SignupTeamMemberCount from './SignupTeamMemberCount'

describe('@components/SignupTeamMemberCount', () => {
  it('exports a valid component', () => {
    expect(SignupTeamMemberCount).toBeAComponent()
  })
  xit(`push to next step route when 'CONTINUAR' is clicked`, () => {
    const $router = {
      push: jest.fn(),
    }
    const { fireEvent, getByText } = render(SignupTeamMemberCount, {
      mocks: {
        $router,
      },
    })
    const nextStepBtn = getByText('continuar')
    fireEvent.click(nextStepBtn)
    expect($router.push).toHaveBeenCalled()
  })
})
