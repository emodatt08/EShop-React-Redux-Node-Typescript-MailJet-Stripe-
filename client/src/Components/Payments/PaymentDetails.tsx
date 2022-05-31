import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { configs } from '../../app-configs';
import Payments from '../../Types/Payments';


export default function PaymentDetails() {
    const [paymentDetails, setPaymentDetails] = React.useState<Payments>();
    const [rawPaymentDetails, setRawPaymentDetails] = React.useState<any>();
    const [allKeys, setAllKeys] = React.useState<string[]>([]);
    const [allValues, setAllValues] = React.useState<string[] | any>([]);
    const {paymentId} = useParams();

    useEffect(() => {
       
        setPaymentDetails(localStorage.getItem('payment') ? JSON.parse(localStorage.getItem('payment')! ) : undefined);
        
    }, []);
   
    useEffect(() => {
          updateInvoiceData();      
    }, []); 

   const checkType = (data: any) => {
    if (
        typeof data === 'object' &&
        !Array.isArray(data) &&
        data !== null
    ) {
        const getData = Object.keys(data);
        const getDataValues = Object.values(data);
        return getData.map((key: string, index:number) => (
            <li style={{border:"3px solid black"}} key={key} className="list-group-item"> <b>{key}</b>{'\u00A0'}{'\u00A0'} {"=>"}{'\u00A0'} {'\u00A0'} {checkType(getDataValues[index])}</li> 
         ))
    }else{
        return data;
    }
   }

    const updateInvoiceData = async () => {
        const paymentData = localStorage.getItem('payment') ? JSON.parse(localStorage.getItem('payment')! ) : undefined
        const paymentResponse = JSON.parse(paymentData!.raw_payment_response);
        const keys = Object.keys(paymentResponse);
        setAllKeys(keys);
        const values = Object.values(paymentResponse);
        setAllValues(values);
        console.log(values);
      };

      

  return (
    <div>
        <p><strong>Payment Details for {paymentDetails?.user?.name} on #{paymentDetails?.orderNo}</strong></p>
    
        <ul className="list-group list-group-vertical">
        {allKeys.map((key: string, index:number) => (
           <li key={key} style={{border:"1px solid black"}} className="list-group-item"> <b>{key}</b>{'\u00A0'}{'\u00A0'} {"=>"}{'\u00A0'} {'\u00A0'} <b>{checkType(allValues[index])}</b></li> 
        ))}
        
       
    </ul>
    </div>
  )
}
