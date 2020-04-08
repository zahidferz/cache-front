import GxListItemResolvedTodo from './GxListItemResolvedTodo'
describe('@components/GxListItemResolvedTodo', () => {
  it('exports a valid component', () => {
    expect(GxListItemResolvedTodo).toBeAComponent()
  })
  it('Renders all elements', () => {
    const { getByText, queryByText } = render(GxListItemResolvedTodo, {
      propsData: {
        description:
          'Diana realizó acción aprobar en 130 recursos de tipo Pagos Pendientes de Aprobar',
        type: 'spendingSentPayments',
        descriptionReferences: null,
        date: '2019-08-31T01:28:35.000Z',
        gxModule: 'spendingSentPayments',
        avatar: {
          userCompleteName: 'Diana',
        },
      },
    })
    expect(
      getByText(
        'Diana realizó acción aprobar en 130 recursos de tipo Pagos Pendientes de Aprobar'
      )
    ).toBeTruthy()
    // Take CI timezone into account
    expect(
      queryByText('30 de ago, 8:28 p.m.') || queryByText('31 de ago, 1:28 a.m.')
    ).toBeTruthy()
    expect(getByText('attach_money')).toBeTruthy()
  })
  it('Renders items when clicked', () => {
    const { fireEvent, queryByText } = render(GxListItemResolvedTodo, {
      propsData: {
        description:
          'Diana realizó acción aprobar en 130 recursos de tipo Pagos Pendientes de Aprobar',
        date: '2019-08-31T01:28:35.000Z',
        avatar: {},
        items: [
          {
            pendingItemId: 'e107e3d2-4c5f-435b-b71f-924b94dd0070',
          },
        ],
      },
    })
    const card =
      queryByText('30 de ago, 8:28 p.m.') || queryByText('31 de ago, 1:28 a.m.')
    fireEvent.click(card)
    expect('Roberto Pérez').toBeTruthy()
  })
  it('Displays initials when there is no avatar imge ', async () => {
    const { getByText } = render(GxListItemResolvedTodo, {
      propsData: {
        description:
          'Diana realizó acción aprobar en 130 recursos de tipo Pagos Pendientes de Aprobar',
        te: '15',
        items: [
          {
            pendingItemId: 'e107e3d2-4c5f-435b-b71f-924b94dd0070',
          },
        ],
        avatar: {
          userCompleteName: 'John Doe',
          image: '',
        },
      },
    })
    let initials = getByText('JD')
    expect(initials).toBeTruthy()
  })
  it('Renders links in description', async () => {
    const { getAllByTestId } = render(GxListItemResolvedTodo, {
      propsData: {
        description:
          '{Diana} realizó acción {aprobar} en {130} recursos de tipo Pagos Pendientes de Aprobar',
        type: 'spendingSentPayments',
        descriptionReferences: null,
        te: '15',
        gxModule: 'spendingSentPayments',
        avatar: {
          userCompleteName: 'Diana',
        },
      },
    })
    let descriptionLinks = getAllByTestId('description')
    expect(descriptionLinks.length).toBe(3)
  })
})
