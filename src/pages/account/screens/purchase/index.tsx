import { AccountContextProvider } from "../../context"
import Purchase from "./Purchase"

export default () => 
     (

        <AccountContextProvider>
            <Purchase />
        </AccountContextProvider>
    )