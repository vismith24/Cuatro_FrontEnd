import Axios from 'axios'
import Cookie from 'js-cookie';

const paymentHandler = async (e, amount) => {
    var body = JSON.stringify({ amount: amount });
    const API_URL = 'http://localhost:8000/';
    e.preventDefault();
    const orderUrl = `${API_URL}order`;
    fetch(`${API_URL}order`, {
      method: "POST",
      headers: {
        Authorization: Cookie.get("JWT") ? Cookie.get("JWT"): "null",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: body
    }).then(res => res.json())
    .then(resJson => {
      console.log(resJson);
    const options = {
      key: process.env.RAZOR_PAY_TEST_KEY,
      name: "Cuatro",
      description: "Payment for purchase",
      "image": require('../images/cuatro-logo.png'),
      order_id: resJson.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${orderUrl}/capture/${paymentId}`;
         const captureResponse = await Axios.post(url, {amount: amount})
         console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },  theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    })
    /*
    const response = await Axios.post(orderUrl, amount, {
        headers: {
            Authorization: Cookie.get("JWT") ? Cookie.get("JWT"): "null",
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        data: body
    });
    const { data } = response;
    const options = {
      key: process.env.RAZOR_PAY_TEST_KEY,
      name: "Cuatro",
      description: "Payment for purchase",
      "amount": "INR 9900",
      "image": require('../images/cuatro-logo.png'),
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${orderUrl}/capture/${paymentId}`;
         const captureResponse = await Axios.post(url, {})
         console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },  theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();*/
};
export default paymentHandler;