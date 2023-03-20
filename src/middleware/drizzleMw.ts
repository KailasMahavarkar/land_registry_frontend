import { generateStore, EventActions } from '@drizzle/store'
import toast from "../toast"
import landRegistery from "../solidity_contracts/LandRegistry.json";

export const drizzleOptions = {
    contracts: [landRegistery as any],
}

const contractEventNotifier = (store: any) => (next: any) => (action: any) => {
    if (action.type === EventActions.EVENT_FIRED) {
        const contract = action.name
        const contractEvent = action.event.event
        const message = action.event.returnValues._message
        const display = `${contract}(${contractEvent}): ${message}`

        toast({
            message: display,
            icon: "info"
        })
    }
    return next(action)
}

const appMiddlewares = [contractEventNotifier]

export const drizzleStore = generateStore({
    drizzleOptions,
    appMiddlewares,
    disableReduxDevTools: false  // enable ReduxDevTools!
})
