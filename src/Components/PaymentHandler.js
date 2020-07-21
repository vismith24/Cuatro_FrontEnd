import Axios from 'axios'
import Cookie from 'js-cookie';
const paymentHandler = async (e) => {
    const API_URL = 'http://localhost:8000/';
    e.preventDefault();
    const orderUrl = `${API_URL}order`;
    const response = await Axios.get(orderUrl, {
        headers: {
            Authorization: Cookie.get("JWT") ? Cookie.get("JWT"): "null"
        }
    });
    const { data } = response;
    const options = {
      key: process.env.RAZOR_PAY_TEST_KEY,
      name: "Cuatro",
      description: "Some Description",
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
    rzp1.open();
};
export default paymentHandler;