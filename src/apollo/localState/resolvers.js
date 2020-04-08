import gql from 'graphql-tag'
// Update the local cache on bootstrap to warm the cache and avoid query errors on start
export const cacheInit = (cache) => {
  const data = {
    user: {
      __typename: 'User',
      name: '',
      lastname: '',
      email: '',
      jobTitle: '',
      phone: null,
      userId: null,
      number: '',
    },
    company: {
      __typename: 'Company',
      number: null,
      branchNumber: null,
      todos: null,
    },
    subscription: {
      __typename: 'Subscription',
      number: localStorage.getItem('temp_subs_number') || '00000000000',
    },
  }
  cache.writeData({
    data,
  })
}

export const typeDefs = gql`
  extend type Query {
    user: String!
    company: String!
    suscription: String!
  }

  type User {
    name: String
    lastname: String
    email: String
    phone: String
    number: String
    jobTitle: String
    userId: String
  }
  type Company {
    number: String
    branchNumber: Int
    taxId: String
  }
  type Subscription {
    number: String
  }
`
export const resolvers = {
  Mutation: {
    updateUserName: (root, { name }, { cache }) => {
      const data = {
        user: {
          __typename: 'User',
          name: name,
        },
      }
      cache.writeData({
        data,
      })
    },
    updateUserLastname: (root, { lastname }, { cache }) => {
      const data = {
        user: {
          __typename: 'User',
          lastname: lastname,
        },
      }
      cache.writeData({
        data,
      })
    },
    updateUserJobTitle: (root, { jobTitle }, { cache }) => {
      const data = {
        user: {
          __typename: 'User',
          jobTitle: jobTitle,
        },
      }
      cache.writeData({
        data,
      })
    },
    updateUserEmail: (root, { email }, { cache }) => {
      const data = {
        user: {
          __typename: 'User',
          email: email,
        },
      }
      cache.writeData({
        data,
      })
    },
    updateUserPhone: (root, { phone }, { cache }) => {
      const data = {
        user: {
          __typename: 'User',
          phone: phone,
        },
      }
      cache.writeData({
        data,
      })
    },
    updateUserNumber: (root, { number }, { cache }) => {
      const data = {
        user: {
          __typename: 'User',
          number: number,
        },
      }
      cache.writeData({
        data,
      })
    },
    updateUserId: (root, { userId }, { cache }) => {
      const data = {
        user: {
          __typename: 'User',
          userId: userId,
        },
      }
      cache.writeData({
        data,
      })
    },
    updateCompanyNumber: (root, { companyNumber }, { cache }) => {
      const data = {
        company: {
          __typename: 'Company',
          number: companyNumber,
        },
      }

      cache.writeData({
        data,
      })
    },
    updateBranchNumber: (root, { branchNumber }, { cache }) => {
      const data = {
        company: {
          __typename: 'Company',
          branchNumber: branchNumber,
        },
      }
      cache.writeData({
        data,
      })
    },
    updateUserInfo: (root, { name, lastname, email, phone }, { cache }) => {
      const data = {
        user: {
          __typename: 'User',
          name: name,
          lastname: lastname,
          email: email,
          phone: phone,
        },
      }
      cache.writeData({
        data,
      })
    },
    updateSubscriptionNumber: (root, { number }, { cache }) => {
      const data = {
        subscription: {
          __typename: 'Subscription',
          number: number,
        },
      }
      cache.writeData({
        data,
      })
    },
    updateTaxInfo: (root, { company }, { cache }) => {
      const data = {
        subscription: {
          __typename: 'Company',
          company: company,
        },
      }
      cache.writeData({
        data,
      })
    },
    userInvite: (
      root,
      { email, jobTitle, companyNumber, actionUrl, profile },
      { cache }
    ) => {
      const data = {
        company: {
          __typename: 'Company',
          number: companyNumber,
        },
        user: {
          email: email,
          jobTitle: jobTitle,
          profile: profile,
          actionUrl: actionUrl,
        },
      }
      cache.writeData({
        data,
      })
    },
  },
}
