import { AccountContextProvider } from "../../context"
import CreateAccount from "./CreateAccount"

export default () => 
     (

        <AccountContextProvider>
            <CreateAccount />
        </AccountContextProvider>
    )