/* global jest */
export const axiosAccountProvisioning = {
  post: jest.fn(() => Promise.resolve({ data: {} })),
}
export const axiosAuth = {
  post: jest.fn(() => Promise.resolve({ data: {} })),
}

export const authService = {
  login: jest.fn(() => Promise.resolve({ data: {} })),
}
