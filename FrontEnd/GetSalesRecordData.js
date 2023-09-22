
export class GetSalesRecordData 
{
    constructor() {}
    consoleSaleDetails()
    {          
        console.log(
            this.MemberId,
            this.paymethod
        );
    }

    setMemberId(MemberId) 
    {
        this.MemberId = MemberId;
        console.log(this.MemberId);
    }

    setpaymethod(paymethod)
    {
        this.paymethod = paymethod;
        console.log(this.paymethod);
    }

    //getters
    
    getMemberId() 
    {
        return this.MemberId;
    }
    getpaymethod() 
    {
        return this.paymethod;
    }

}
