import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';


export default function Paypal(props) {


    const onSuccess = (payment) =>{ 
        //console.log(JSON.stringify(payment));
        props.onSuccess(payment);

         // { 
        //     "paid": true, 
        //     "cancelled": false, 
        //     "payerID": "3GFGQ6GNJ4PWA", 
        //     "paymentID": "PAY-0UB74233TB278434KLMYYMVY", 
        //     "paymentToken": "EC-2J270753AK460261B", 
        //     "returnUrl": "https://www.sandbox.paypal.com/?paymentId=PAY-0UB74233TB278434KLMYYMVY&token=EC-2J270753AK460261B&PayerID=3GFGQ6GNJ4PWA", 
        //     "address": { 
        //         "recipient_name": "test buyer", 
        //         "line1": "1 Main St", 
        //         "city": "San Jose", 
        //         "state": "CA", 
        //         "postal_code": "95131", 
        //         "country_code": "US" 
        //     }, 
        //     "email": "fernando.lobo.prez-buyer@gmail.com" 
        // }


    }

    const onCancel = (data) =>{
        console.log(JSON.stringify(data))
    }

    const onError = (err) => {
        console.log(JSON.stringify(err))
    }

    let env = 'sandbox';
    let currency = 'USD';
    let total = props.toPay;

    const client = {
        sandbox:'AVOownGa3cwOaZTvh33Ap-mqlaQSVOxwNk5oqDPsREtZ5OXSyHJYEMeO0Mn17GP9ArCMZ6AUmhoPLM9I',
        production:''
    }

    return (
      
            <div className="paypal_wrapp">
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size:'responsive',
                        color: 'gold',
                        shape: 'rect',
                        label: 'checkout'
                    }}
                />
                {!props.show && <button className="mask" onClick={e => props.handleSubmit(e)}></button>}
                
            </div>
   
    )
}


// class Paypal extends Component {


//     handleButton(e) {
//         e.preventDefault()
//         console.log('Hihi')
//     }


//     render() {

//         const onSuccess = (payment) =>{ 
//             //console.log(JSON.stringify(payment));
//             this.props.onSuccess(payment);

//              // { 
//             //     "paid": true, 
//             //     "cancelled": false, 
//             //     "payerID": "3GFGQ6GNJ4PWA", 
//             //     "paymentID": "PAY-0UB74233TB278434KLMYYMVY", 
//             //     "paymentToken": "EC-2J270753AK460261B", 
//             //     "returnUrl": "https://www.sandbox.paypal.com/?paymentId=PAY-0UB74233TB278434KLMYYMVY&token=EC-2J270753AK460261B&PayerID=3GFGQ6GNJ4PWA", 
//             //     "address": { 
//             //         "recipient_name": "test buyer", 
//             //         "line1": "1 Main St", 
//             //         "city": "San Jose", 
//             //         "state": "CA", 
//             //         "postal_code": "95131", 
//             //         "country_code": "US" 
//             //     }, 
//             //     "email": "fernando.lobo.prez-buyer@gmail.com" 
//             // }


//         }

//         const onCancel = (data) =>{
//             console.log(JSON.stringify(data))
//         }

//         const onError = (err) => {
//             console.log(JSON.stringify(err))
//         }

//         let env = 'sandbox';
//         let currency = 'USD';
//         let total = this.props.toPay;

//         const client = {
//             sandbox:'AVOownGa3cwOaZTvh33Ap-mqlaQSVOxwNk5oqDPsREtZ5OXSyHJYEMeO0Mn17GP9ArCMZ6AUmhoPLM9I',
//             production:''
//         }
        
       

        
//         return (
//             <button className="paypal_button" onClick={e => this.handleButton(e)}>
//                 <PaypalExpressBtn
//                     env={env}
//                     client={client}
//                     currency={currency}
//                     total={total}
//                     onError={onError}
//                     // onSuccess={onSuccess}
//                     onCancel={onCancel}
//                     style={{
//                         size:'responsive',
//                         color: 'gold',
//                         shape: 'rect',
//                         label: 'checkout'
//                     }}

//                     onClick={e => console.log(e)}
                    
                  
//                 />
//             </button>
//         );
//     }
// }

// export default Paypal;