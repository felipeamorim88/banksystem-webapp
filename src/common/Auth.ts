import AsyncStorage from "./AsyncStorage";
export default  {
    loggedIn: async() => {
        let flag = false;
        //check user has JWT token
        await AsyncStorage.getItem("access_token") ? flag = true : flag = false
      
        return flag
      },
      isAdmin: async() => {
        let flag = false;
      
        //check user has admin privileges
        await AsyncStorage.getItem("user_type") ?
        await AsyncStorage.getItem("user_type") == '1' ? flag = true :
            flag = false : flag = false
      
        return flag
      },
      hasAccount: async() => {
        let flag = false;
      
        //check user has admin privileges
        await AsyncStorage.getItem("account_id") ? flag = true : flag = false;
      
        return flag
      },
      verified: async() => {
        let flag = false;
      
        //check user has admin privileges
        await AsyncStorage.getItem("verified") ?
        await AsyncStorage.getItem("verified") == '1' ? flag = true :
            flag = false : flag = false
      
        return flag
      }
};