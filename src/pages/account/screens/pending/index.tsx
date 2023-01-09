import { AccountContextProvider } from "../../context"
import Pending from "./pending"

export default () => 
     (

        <AccountContextProvider>
            <Pending />
        </AccountContextProvider>
    )