import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo, Dispatch } from "react"
import {ActivityActions } from "../reducers/activity-reducers"

type ActivityListProps ={
    activities: Activity[],
    dispatch : Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch}: ActivityListProps) {
    //console.log(activities)
    const categoryName = useMemo (() =>
    (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
,[])

    return(
        <>
        <h2 className="text-4x1 font-bold text-slate-600 text-center">
            Automovil y su precio
        </h2>
        {activities.map( activity =>(
            <div key = {activity.id} className="px-5 py-10 bg-white m-5 flex justify-between">
                <div className="space-y-2 relative">
                    <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold
                    ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                      {categoryName(+activity.category)}
                    </p>
                    <p className="text-2x1 font-bold pt-5">{activity.name}</p>
                    <p className="font-black text-4x1 text-lime-500">
                        {activity.calories}{''}
                        <span> Precio </span>
                    </p>
                </div>
                <div>
                    <button
                       onClick={ () => dispatch ({ type: "set-active-id" , payload: { id: activity.id}})}
                    >
                    
                    </button>

                </div>
            </div>
        ))}
        </>
    )
}