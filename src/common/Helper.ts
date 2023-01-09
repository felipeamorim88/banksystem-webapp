export default  {
    sum: (list:Array<any>, prop:string) => {
        return list.reduce((accumulator:any, object:any) => {
          if(object.transaction_hash == '')
          return accumulator + object[prop];
          return accumulator - object[prop];
        }, 0);
      }
};