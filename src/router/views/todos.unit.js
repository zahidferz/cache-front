import todos from './todos'
import todosFixtures from '../../../tests/___fixtures___/todos'
import solvedTodosFixtures from '../../../tests/___fixtures___/solvedTodos'
import branches from '../../../tests/___fixtures___/branches'
import { restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'
import GxCardToDo from '@components/_Core/Cards/GxCardToDo'
import GxListItemResolvedTodo from '@components/_Core/Lists/GxListItemResolvedTodo'
import Observer from '@components/_Core/Utils/Observer'
jest.mock('lodash/debounce', () => jest.fn((cb) => cb))
jest.mock('vue-cli-plugin-apollo/graphql-client')
Element.prototype.scrollIntoView = jest.fn()
describe('@views/todos', () => {
  xit('Set fetch policy as network-only  and restarting websocket connection', () => {
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    render(todos, {
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    expect(restartWebsockets).toBeCalled()
    expect($apollo.queries.getTodos.setOptions).toBeCalledWith({
      fetchPolicy: 'network-only',
    })
  })
  xit('Renders all pending todos', () => {
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const { wrapper } = render(todos, {
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    wrapper.setData({
      getTodos: { list: todosFixtures, size: todosFixtures.length },
    })
    const components = wrapper.findAll(GxCardToDo)
    expect(components.length).toBe(todosFixtures.length)
  })
  xit('Displays no todos image', () => {
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const { wrapper, getByText, getByAltText } = render(todos, {
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    wrapper.setData({
      getTodos: { list: [], size: 0 },
    })
    getByText('¡Sonríe! No tienes pendientes.')
    getByAltText('Sin pendientes')
  })
  xit('Displays no results image', () => {
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const {
      wrapper,
      getByText,
      fireEvent,
      getByLabelText,
      getByAltText,
    } = render(todos, {
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    wrapper.setData({
      getTodos: { list: [], size: 0 },
      branches,
    })
    const filters = getByText('filter_list')
    fireEvent.click(filters)
    const firstOption = getByLabelText(branches[0].name)
    fireEvent.change(firstOption, {
      target: { checked: true, value: branches[0].branchNumber },
    })
    const filterButton = getByText('filtrar')
    fireEvent.click(filterButton)
    expect(wrapper.vm.filterBranches.length).toBeGreaterThan(0)
    wrapper.setData({
      getTodos: { list: [], size: 0 },
    })
    getByText('No encontramos nada relacionado con tu búsqueda.')
    getByAltText('Sin resultados')
  })
  xit('Clear filters button', () => {
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const {
      wrapper,
      getByText,
      fireEvent,
      getByLabelText,
      getByAltText,
      queryByText,
    } = render(todos, {
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    wrapper.setData({
      getTodos: { list: [], size: 0 },
      branches,
    })
    const filters = getByText('filter_list')
    fireEvent.click(filters)
    const firstOption = getByLabelText(branches[0].name)
    fireEvent.change(firstOption, {
      target: { checked: true, value: branches[0].branchNumber },
    })
    const filterButton = getByText('filtrar')
    fireEvent.click(filterButton)
    expect(wrapper.vm.filterBranches.length).toBeGreaterThan(0)
    wrapper.setData({
      getTodos: { list: [], size: 0 },
    })
    getByText('No encontramos nada relacionado con tu búsqueda.')
    getByAltText('Sin resultados')
    getByText('Borrar filtro')
    const clearButton = getByText('close')
    fireEvent.click(clearButton)
    expect(wrapper.vm.filterBranches).toBe(null)
    expect(queryByText('close')).toBeFalsy()
    expect(queryByText('Borrar filtro')).toBeFalsy()
  })
  xit('Search input', () => {
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const {
      wrapper,
      getByText,
      fireEvent,
      getByPlaceholderText,
      queryByPlaceholderText,
    } = render(todos, {
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    wrapper.setData({
      getTodos: { list: [], size: 0 },
      branches,
    })
    const searchButton = getByText('search')
    const textValue = 'text search'
    fireEvent.click(searchButton)
    const searchInput = getByPlaceholderText('Buscar en Mis pendientes')
    fireEvent.input(searchInput, { target: { value: textValue } })
    expect(wrapper.vm.textSearch).toBe(textValue)
    const closeButton = getByText('close')
    fireEvent.click(closeButton)
    expect(wrapper.vm.textSearch).toBe(null)
    expect(queryByPlaceholderText('Buscar en Mis pendientes')).toBeFalsy()
  })
  xit('Updating active tab', () => {
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const { wrapper, getByText, fireEvent } = render(todos, {
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'GxListItemResolvedTodo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    wrapper.setData({
      getTodos: { list: todosFixtures, size: todosFixtures.length },
      branches,
    })
    const solvedTab = getByText('resueltos')
    fireEvent.click(solvedTab)
    expect(wrapper.vm.mobileCurrentTab).toBe(1)
    expect(wrapper.vm.activeTab).toBe('resolved')
    wrapper.setData({
      getTodos: { list: todosFixtures, size: todosFixtures.length },
      branches,
    })
    const solvedTodos = wrapper.findAll(GxListItemResolvedTodo)
    expect(solvedTodos.length).toBeGreaterThan(0)
    const pendingTab = getByText('Mis Pendientes')
    fireEvent.click(pendingTab)
    wrapper.setData({
      getTodos: { list: todosFixtures, size: todosFixtures.length },
      branches,
    })
    const pendingTodos = wrapper.findAll(GxCardToDo)
    expect(wrapper.vm.mobileCurrentTab).toBe(0)
    expect(pendingTodos.length).toBeGreaterThan(0)
    expect(wrapper.vm.activeTab).toBe('pending')
  })
  xit('Displays end of list message', () => {
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const { wrapper, getByText } = render(todos, {
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    wrapper.setData({
      getTodos: { list: todosFixtures, size: todosFixtures.length },
      branches,
    })
    getByText('¡Bien! Estos son todos tus pendientes')
  })
  xit('Calls fetchMore with next page on load event', () => {
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
          fetchMore: jest.fn((object) => object),
          loading: false,
        },
      },
    }
    const { wrapper } = render(todos, {
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'Observer',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    wrapper.setData({
      getTodos: { list: todosFixtures, size: todosFixtures.length * 2 },
      branches,
    })
    const observer = wrapper.find(Observer)
    expect(observer.exists()).toBe(true)
    const lastPage = wrapper.vm.page
    observer.vm.$emit('load')
    expect(wrapper.vm.page).toBe(lastPage + 1)
    expect($apollo.queries.getTodos.fetchMore).toBeCalled()
  })
  xit('Branches Filter Desktop', () => {
    const mqConfig = {
      breakpoints: {
        mo: 768,
        de: Infinity,
      },
      defaultBreakpoint: 'de',
    }
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const {
      wrapper,
      getByText,
      fireEvent,
      getByLabelText,
      queryByLabelText,
    } = render(todos, {
      mqConfig,
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    wrapper.setData({
      getTodos: { list: [], size: 0 },
      branches,
    })
    const filter = getByText('Sucursal')
    fireEvent.click(filter)
    const branchCheckbox = getByLabelText(branches[0].name)
    fireEvent.change(branchCheckbox, {
      target: { checked: true, value: branches[0].branchNumber },
    })
    expect(wrapper.vm.filterBranches[0]).toBe(branches[0].branchNumber)
    const clearFilter = getByText('Borrar filtros')
    fireEvent.click(clearFilter)
    expect(wrapper.vm.filterBranches.length).toBe(0)
    expect(queryByLabelText(branches[0].name)).toBeFalsy()
  })
  xit('Hides branch filter  when users click on all but filter popover (pending todo)', () => {
    const mqConfig = {
      breakpoints: {
        mo: 768,
        de: Infinity,
      },
      defaultBreakpoint: 'de',
    }
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const {
      wrapper,
      getByText,
      fireEvent,
      getByLabelText,
      queryByLabelText,
    } = render(todos, {
      mqConfig,
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    wrapper.setData({
      getTodos: { list: todosFixtures, size: todosFixtures.length },
      branches,
    })
    const filter = getByText('Sucursal')
    fireEvent.click(filter)
    getByLabelText(branches[0].name)
    const gxCardTodo = wrapper.find(GxCardToDo)
    expect(gxCardTodo.exists()).toBe(true)
    gxCardTodo.vm.$emit('closeClickOutside')
    expect(queryByLabelText(branches[0].name)).toBeFalsy()
  })
  xit('Hides branch filter when users click on all but filter popover (solved todos)', () => {
    const mqConfig = {
      breakpoints: {
        mo: 768,
        de: Infinity,
      },
      defaultBreakpoint: 'de',
    }
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const {
      wrapper,
      getByText,
      fireEvent,
      getByLabelText,
      queryByLabelText,
    } = render(todos, {
      mqConfig,
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    const solvedTab = getByText('resueltos')
    fireEvent.click(solvedTab)
    wrapper.setData({
      getTodos: { list: solvedTodosFixtures, size: solvedTodosFixtures.length },
      branches,
    })
    const filter = getByText('Sucursal')
    fireEvent.click(filter)
    getByLabelText(branches[0].name)
    const someElement = getByText('Enrique Rosales')
    fireEvent.click(someElement)
    expect(queryByLabelText(branches[0].name)).toBeFalsy()
  })
  xit('Search input desktop', () => {
    const mqConfig = {
      breakpoints: {
        mo: 768,
        de: Infinity,
      },
      defaultBreakpoint: 'de',
    }
    restartWebsockets.mockImplementationOnce(jest.fn(() => true))
    const $apollo = {
      provider: {
        clients: { defaultClient: { wsClient: { name: 'el sockete' } } },
      },
      queries: {
        getTodos: {
          setOptions: jest.fn((object) => object),
        },
      },
    }
    const {
      wrapper,
      getByText,
      fireEvent,
      getByPlaceholderText,
      queryByPlaceholderText,
    } = render(todos, {
      mqConfig,
      mocks: {
        $apollo,
      },
      stubs: [
        'GxCardToDo',
        'AsideMain',
        'TopBarLeftDrawer',
        'TopBarRightDrawer',
        'NotificationIcon',
        'ProfileIcon',
      ],
    })
    wrapper.setData({
      getTodos: { list: [], size: 0 },
      branches,
    })
    const textValue = 'sockete'
    let searchInput = getByPlaceholderText('Buscar en Mis pendientes')
    expect(queryByPlaceholderText('Buscar en Resueltos')).toBeFalsy()
    fireEvent.input(searchInput, { target: { value: textValue } })
    expect(wrapper.vm.textSearch).toBe(textValue)
    const solvedTab = getByText('resueltos')
    fireEvent.click(solvedTab)
    searchInput = getByPlaceholderText('Buscar en Resueltos')
    fireEvent.input(searchInput, { target: { value: textValue } })
    expect(wrapper.vm.textSearch).toBe(textValue)
    expect(queryByPlaceholderText('Buscar en Mis pendientes')).toBeFalsy()
  })
})
