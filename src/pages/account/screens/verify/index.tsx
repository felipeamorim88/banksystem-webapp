import { AccountContextProvider } from "../../context"
import VerifyAccount from "./VerifyAccount"

export default () => 
     (

        <AccountContextProvider>
            <VerifyAccount />
        </AccountContextProvider>
    )