import { AccountContextProvider } from "../../context"
import AccountBalance from "./AccountBalance"

export default () => 
     (

        <AccountContextProvider>
            <AccountBalance />
        </AccountContextProvider>
    )