import { Activity } from "../types"

// Definición de todas las acciones posibles
export type ActivityActions =
  | { type: 'save-activity'; payload: { newActivity: Activity } }
  | { type: 'set-active-id'; payload: { id: Activity['id'] } }
  | { type: 'load-activities'; payload: { activities: Activity[] } }
  | { type: 'delete-activity'; payload: { id: Activity['id'] } }
  | { type: 'update-activity'; payload: { updatedActivity: Activity } }

// Estado de la aplicación
export type ActivityState = {
  activities: Activity[],
  activeId: Activity['id'] | ''
}

// Estado inicial
export const initialState: ActivityState = {
  activities: [],
  activeId: ''
}

// Reducer que maneja todas las acciones
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
): ActivityState => {

  switch (action.type) {

    case 'save-activity': {
      let updatedActivities: Activity[] = []

      if (state.activeId) {
        // Modificar actividad existente
        updatedActivities = state.activities.map(activity =>
          activity.id === state.activeId ? action.payload.newActivity : activity
        )
      } else {
        // Crear nueva actividad
        updatedActivities = [...state.activities, action.payload.newActivity]
      }

      return {
        ...state,
        activities: updatedActivities,
        activeId: ''
      }
    }

    case 'set-active-id':
      return {
        ...state,
        activeId: action.payload.id
      }

    case 'load-activities':
      return {
        ...state,
        activities: action.payload.activities
      }

    case 'delete-activity':
      return {
        ...state,
        activities: state.activities.filter(activity => activity.id !== action.payload.id)
      }

    case 'update-activity':
      return {
        ...state,
        activities: state.activities.map(activity =>
          activity.id === action.payload.updatedActivity.id
            ? action.payload.updatedActivity
            : activity
        ),
        activeId: ''
      }

    default:
      return state
  }
}
