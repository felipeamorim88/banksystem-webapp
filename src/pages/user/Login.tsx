import { UserContextProvider } from "./context"
import Login from "./screens/Login"

export default () => 
     (

        <UserContextProvider>
            <Login />
        </UserContextProvider>
    )