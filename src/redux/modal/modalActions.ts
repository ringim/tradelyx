export const TOGGLE_CAMERA_MODAL = 'TOGGLE_CAMERA_MODAL'

export const toggleCameraModalSuccess = (toggleValue: any) => ({
    type: TOGGLE_CAMERA_MODAL,
    payload: { toggleValue }
})

export function toggleCameraModal(toggleValue: any) {
    return (dispatch: (arg0: { type: string; payload: { toggleValue: any } }) => void) => {
        dispatch(toggleCameraModalSuccess(toggleValue))
    }
}