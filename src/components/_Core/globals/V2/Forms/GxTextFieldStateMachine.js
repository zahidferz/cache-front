import { actions, send, interpret, Machine, assign } from 'xstate'

// ========================================
// START XState Visualizer section
// Copy all the code in this section into XState Visualizer https://xstate.js.org/viz/
// ========================================
// Available variables:
// - Machine
// - interpret
// - assign
// - send
// - sendParent
// - spawn
// - raise
// - actions
// - XState (all XState exports)
const { cancel } = actions

// Delayed event as user types
// action to send the 'TIMER' event after 1 second
const triggerValidationAfter1Second = send('VALIDATE', {
  delay: 1000,
  id: 'oneSecondTimer', // give the event a unique ID
})

const cancelTimer = cancel('oneSecondTimer')

// GUARDS
const isTouchedAndEmptyAndRequired = (context, event) => {
  return context.touchCount > 1 && context.required && context.value === ''
}
const isEmptyAndRequired = (context, event) => {
  return context.required && context.value === ''
}
const isEmpty = (context, event) => {
  return context.value === ''
}
const isValidAndRequired = (context, event) => {
  return !context.errorMsg && context.required
}
const isValid = (context, event) => {
  return !context.errorMsg
}
const hasErrorAndRequired = (context, event) => {
  return context.errorMsg && context.required
}
const isRequired = (context) => {
  return context.required
}
// END GUARDS

// STATES
const blurredStatusStates = {
  initial: 'inactive',
  states: {
    inactive: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    emptyAndRequired: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    empty: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    validAndRequired: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    valid: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    errorFork: {
      on: {
        '': [
          {
            target: 'errorAndRequired',
            cond: 'isRequired',
          },
          {
            target: 'error',
          },
        ],
      },
    },
    errorAndRequired: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    error: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    // disabled: {},
    typing: {
      entry: ['validate'],
      on: {
        '': 'validating',
      },
    },
    validating: {
      on: {
        '': [
          {
            target: 'emptyAndRequired',
            cond: 'isEmptyAndRequired',
          },
          {
            target: 'empty',
            cond: 'isEmpty',
          },
          {
            target: 'validAndRequired',
            cond: 'isValidAndRequired',
          },
          {
            target: 'valid',
            cond: 'isValid',
          },
          {
            target: 'errorFork',
          },
        ],
      },
    },
  },
}

const focusedStatusStates = {
  initial: 'active',
  states: {
    active: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    emptyAndRequired: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    validAndRequired: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    valid: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    errorFork: {
      on: {
        '': [
          {
            target: 'errorAndRequired',
            cond: 'isRequired',
          },
          {
            target: 'error',
          },
        ],
      },
    },
    errorAndRequired: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    error: {
      on: {
        TYPING: 'typing',
        ERROR: {
          actions: ['setError'],
          target: 'errorFork',
        },
      },
    },
    // disabled: {},
    typing: {
      entry: ['validate', 'triggerValidationAfter1Second'],
      on: {
        VALIDATE: 'validating',
        TYPING: [
          {
            actions: 'cancelTimer',
            target: 'typing',
          },
        ],
      },
    },
    validating: {
      on: {
        '': [
          {
            target: 'emptyAndRequired',
            cond: 'isTouchedAndEmptyAndRequired',
          },
          {
            target: 'active',
            cond: 'isEmpty',
          },
          {
            target: 'validAndRequired',
            cond: 'isValidAndRequired',
          },
          {
            target: 'valid',
            cond: 'isValid',
          },
          {
            target: 'errorFork',
          },
        ],
      },
    },
  },
}

function createInputMachine({ value, required, errorMsg, validationFn }) {
  return Machine(
    {
      id: 'input',
      initial: 'blurred',
      context: {
        touchCount: 0,
        value,
        required,
        errorMsg,
        validationFn,
      },
      states: {
        blurred: {
          on: {
            FOCUS: {
              target: 'focused.validating',
              actions: ['touch'],
            },
          },
          ...blurredStatusStates,
        },
        focused: {
          on: {
            BLUR: 'blurred.validating',
          },
          ...focusedStatusStates,
        },
      },
    },
    {
      actions: {
        touch: assign((context, event) => {
          return {
            touchCount: context.touchCount + 1,
          }
        }),
        validate: assign((context, event) => {
          return {
            value: event.value,
            errorMsg: context.validationFn
              ? context.validationFn(event.value)
              : '',
          }
        }),
        triggerValidationAfter1Second,
        cancelTimer,
        setError: assign((context, event) => {
          return {
            errorMsg: event.errorMsg,
          }
        }),
      },
      guards: {
        isTouchedAndEmptyAndRequired,
        isEmptyAndRequired,
        isEmpty,
        isValidAndRequired,
        isValid,
        hasErrorAndRequired,
        isRequired,
      },
    }
  )
}

// ****************************************
// When copying to the visualizer, uncomment this next section to initialize:
// ****************************************
// const inputMachine = createInputMachine({
//   value: '',
//   required: true,
//   errorMsg: '',
//   validationFn: (str) => {
//     console.log('Validating: ', str, str === 'beta')

//     if (str !== 'beta') {
//       return 'String must be beta'
//     }
//     return ''
//   },
// })

// const inputService = interpret(inputMachine)
//   .onTransition((state) => {
//     // console.log(state.context.count)
//   })
//   .start()

// ========================================
// Copy all the code above this line into XState Visualizer https://xstate.js.org/viz/
// END XState Visualizer section
// ========================================

export const createInputService = function createInputService(machineOptions) {
  const inputMachine = createInputMachine(machineOptions)
  const inputService = interpret(inputMachine)
    .onTransition((state) => {
      /* eslint-disable */
      // console.log(state)
      /* eslint-enable */
    })
    .start()

  return inputService
}

// createInputService({
//   value: 'Alpha',
//   validationFn: (str) => {
//     console.log('Validating: ', str, str === 'beta')
//     return str === 'beta'
//   },
// })
