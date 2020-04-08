import GxCardToDo from './GxCardToDo'
describe('@components/GxCardToDo', () => {
  it('exports a valid component', () => {
    expect(GxCardToDo).toBeAComponent()
  })
  it('Renders card elements', () => {
    const { getByText, getByTitle } = render(GxCardToDo, {
      stubs: ['router-link', 'RouterLink'],
      propsData: {
        title: 'Solicitud para Unirse al Equipo',
        id: 'companyUsersJoinRequestApproval',
        type: 'companyUsersJoinRequestApproval',
        subtitleToDo:
          '{Roberto Pérez} y {2 personas} más solicitaron unirse al equipo de {La Selvita}',
        date: '1566829467691',
        actions: ['Aceptar', 'Rechazar'],
        gxModule: 'users',
        users: [
          {
            userCompleteName: 'John Doe',
            userNumber: '1',
          },
          {
            userCompleteName: 'Doe John',
            userNumber: '2',
          },
        ],
      },
    })
    expect(getByText('Solicitud para Unirse al Equipo')).toBeTruthy()
    expect(getByText('Roberto Pérez')).toBeTruthy()
    expect(getByText('Aceptar')).toBeTruthy()
    expect(getByText('Rechazar')).toBeTruthy()
    expect(getByTitle('John Doe')).toBeTruthy()
    expect(getByTitle('Doe John')).toBeTruthy()
  })
  it('Renders only 4 users when 6 o more users with permissions to solved todo.', () => {
    const { queryByTitle } = render(GxCardToDo, {
      stubs: ['router-link', 'RouterLink'],
      propsData: {
        id: 'companyUsersJoinRequestApproval',
        subtitleToDo:
          '{Roberto Pérez} y {2 personas} más solicitaron unirse al equipo de {La Selvita}',
        gxModule: 'users',
        users: [
          {
            userCompleteName: '1',
            userNumber: '1',
          },
          {
            userCompleteName: '2',
            userNumber: '2',
          },
          {
            userCompleteName: '3',
            userNumber: '3',
          },
          {
            userCompleteName: '4',
            userNumber: '4',
          },
          {
            userCompleteName: '5',
            userNumber: '5',
          },
          {
            userCompleteName: '6',
            userNumber: '6',
          },
        ],
      },
    })
    expect(queryByTitle('4')).toBeTruthy()
    expect(queryByTitle('5')).toBeFalsy()
    expect(queryByTitle('6')).toBeFalsy()
  })
  it('Calls mutation when accept button is clicked', async () => {
    const $apollo = {
      mutate: jest.fn(() => Promise.resolve()),
    }
    const { getByText, fireEvent, wait } = render(GxCardToDo, {
      stubs: ['router-link', 'RouterLink'],
      propsData: {
        title: 'Solicitud para Unirse al Equipo',
        id: 'companyUsersJoinRequestApproval',
        type: 'companyUsersJoinRequestApproval',
        subtitleToDo:
          '{Roberto Pérez} y {2 personas} más solicitaron unirse al equipo de {La Selvita}',
        date: '1566829467691',
        actions: ['Aceptar', 'Rechazar'],
        gxModule: 'users',
        users: [
          {
            userCompleteName: 'John Doe',
            userNumber: '1',
          },
        ],
      },
      mocks: {
        $apollo,
      },
    })
    const acceptBtn = getByText('Aceptar')
    fireEvent.click(acceptBtn)
    await wait(() => {
      expect($apollo.mutate).toHaveBeenCalledTimes(1)
    })
  })
  it('Calls mutation when reject button is clicked', async () => {
    const $apollo = {
      mutate: jest.fn(() => Promise.resolve()),
    }
    const { getByText, fireEvent, wait } = render(GxCardToDo, {
      stubs: ['router-link', 'RouterLink'],
      propsData: {
        title: 'Solicitud para Unirse al Equipo',
        id: 'companyUsersJoinRequestApproval',
        type: 'companyUsersJoinRequestApproval',
        subtitleToDo:
          '{Roberto Pérez} y {2 personas} más solicitaron unirse al equipo de {La Selvita}',
        date: '1566829467691',
        actions: ['Aceptar', 'Rechazar'],
        gxModule: 'users',
        users: [
          {
            userCompleteName: 'John Doe',
            userNumber: '1',
          },
        ],
      },
      mocks: {
        $apollo,
      },
    })
    const acceptBtn = getByText('Rechazar')
    fireEvent.click(acceptBtn)
    await wait(() => {
      expect($apollo.mutate).toHaveBeenCalledTimes(1)
    })
  })
  it('Displays different icon depending on type', async () => {
    const { getByText } = render(GxCardToDo, {
      stubs: ['router-link', 'RouterLink', 'Portal'],
      propsData: {
        title: 'Pagos Pendientes de Aprobar',
        id: 'spendingSentPaymentsApproval',
        type: 'spendingSentPaymentsApproval',
        subtitleToDo: 'Tienes {2 pagos} para aprobar el día de hoy',
        date: '1566829467691',
        actions: ['Aprobarlos', 'Rechazarlos'],
        gxModule: 'spendingSentPayments',
        users: [
          {
            userCompleteName: 'John Doe',
            userNumber: '1',
          },
        ],
      },
    })
    expect(getByText('attach_money')).toBeTruthy()
  })
})
