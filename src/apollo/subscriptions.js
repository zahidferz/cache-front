import gql from 'graphql-tag'
export const SOLVED_TODOS_SUBSCRIPTION = gql`
  subscription SOLVED_TODOS_SUBSCRIPTION($companyNumber: Int!) {
    pendingActionDoneCreated(companyNumber: $companyNumber) {
      pendingType
      pendingActionDone {
        type
        branchNumber
        pendingActionDoneId
        completionAction
        actionedResourcesType
        datetime
        description
        completedBy {
          image
          color
          userStatus
          userCompleteName
        }
        items {
          pendingItemId
          type
        }
      }
    }
  }
`
export const TODOS_SUBSCRIPTION = gql`
  subscription TODOS_SUBSCRIPTION($companyNumber: Int!) {
    pendingActionUpdated(companyNumber: $companyNumber) {
      companyNumber
      pendingType
      pendingAction {
        type
        companyNumber
        itemsCount
        datetime
        actionableResourcesType
        title
        branchNumber
        users {
          userNumber
          userCompleteName
          image
        }
        description
        actions
        items {
          pendingItemId
        }
      }
    }
  }
`
