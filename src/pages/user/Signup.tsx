import { UserContextProvider } from "./context"
import Signup from "./screens/Signup"

export default () => 
     (

        <UserContextProvider>
            <Signup />
        </UserContextProvider>
    )