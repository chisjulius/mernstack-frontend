import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'


export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: workOutDispatch } =useWorkoutsContext()

    const logout = () =>{
        //remove user from storage
        localStorage.removeItem('user')

       //dispatch logout action
        dispatch({ type: 'LOGOUT'})
        workOutDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}

}