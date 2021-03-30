import { hasLoaded } from '../../../hooks'

const AwaitPlayerLoadWrapper = ({ children }) => {
    const isLoaded = hasLoaded()
    if (!isLoaded) return null
    return children
}

export default AwaitPlayerLoadWrapper
