import { useEffect } from 'react'
import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/workoutForms'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

 // "proxy": "http://localhost:4000",

const Home = () =>{
    const {workouts, dispatch} = useWorkoutsContext()
    const { user } = useAuthContext()

    useEffect(() =>{ 
        const fetchWorkouts = async() => {
            const response = await fetch('https://mern-stack-g4bt.onrender.com/api/workouts/', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                console.log(json)
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        if(user){
            fetchWorkouts()
        }
    }, [dispatch, user])
    return (
        <div className="home">
            <div className='workouts'>
                {workouts && workouts.map((workout) =>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
           </div>
           <WorkoutForm/>
        </div>
    )
}

export default Home