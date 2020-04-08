import SignupSolvingMainProblem from './SignupSolvingMainProblem'

describe('@components/SignupSolvingMainProblem', () => {
  it('exports a valid component', () => {
    expect(SignupSolvingMainProblem).toBeAComponent()
  })
  it('shows a textArea wich accepts an input', () => {
    const { getByLabelText } = render(SignupSolvingMainProblem, {
      stubs: ['Portal'],
    })
    expect(getByLabelText('mainProblem')).toBeTruthy()
  })
  xit(`calls sendComment when 'CONTINUAR' is clicked`, () => {
    const { fireEvent, getByText } = render(SignupSolvingMainProblem, {
      stubs: ['Portal'],
    })
    const nextPageBtn = getByText('continuar')
    fireEvent.submit(nextPageBtn)
    expect(getByText('Bienvenido')).toBeTruthy()
  })
})
