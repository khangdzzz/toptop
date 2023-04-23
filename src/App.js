import { useState, useEffect, useReducer, useRef } from 'react'


const initial = {
  job: '',
  jobs: []
}

const Add = 'add'
const Delete = 'delete'
const Set = 'set'



const reducer = (state, action) => {
  let newState

  switch (action.type) {
    case Set:
      newState = {
        ...state,
        job: action.payload
      }
      break
    case Add:
      newState = {
        ...state,
        job: '',
        jobs: [...state.jobs, action.payload]
      }
      break
    case Delete: {
      state.jobs.splice(action.payload, 1)
      newState = {
        ...state
      }
      break
    }
    default:
      throw new Error('Invalid action !')
  }
  return newState
}

function logger(reducerFun) {

  return (preState, action) => {
    const newState = reducerFun(preState, action)

    return newState
  }
}


function App() {
  const [state, dispatch] = useReducer(logger(reducer), initial)
  const inputRef = useRef()

  return (
    <div style={{ margin: '50px' }}>
      <input
        ref={inputRef}
        value={state.job}
        placeholder="Enter the job...."
        onChange={(e) => {
          dispatch({
            type: Set,
            payload: e.target.value
          })
        }}
      />
      <button onClick={() => {
        inputRef.current.focus()
        dispatch({
          type: Add,
          payload: state.job
        })
      }
      }
      >add</button>

      <ul>
        {state.jobs.map((job, index) => (
          <li
            key={index}
          >
            {job}
            <span
              style={{ marginLeft: '20px', cursor: 'pointer' }}
              onClick={() =>
                dispatch({
                  type: Delete,
                  payload: index
                })
              }
            >
              x
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
