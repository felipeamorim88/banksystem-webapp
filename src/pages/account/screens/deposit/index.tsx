import { AccountContextProvider } from "../../context"
import Deposit from "./deposit"

export default () => 
     (

        <AccountContextProvider>
            <Deposit />
        </AccountContextProvider>
    )