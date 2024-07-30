
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import OrderTable from "@/components/Table";


export default function Home() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const fetchData = async () => {
    try {
      // Replace with your actual fetch or data retrieval logic
      const response = await fetch('/data/index.json');
      const result = await response.json();
      setData(result); // Set the data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    // Fetch the JSON data from the public folder
    if(!data){
      fetchData();
    }
  }, [data]);

  
  const get_orders_by_date = (order_date, status=None) => {
    const result = data?.orders?.filter(item => dayjs(item?.orderDate).format('YYYY-MM-DD') == order_date && item?.status == status);
    if (result && result.length > 0) {
    result?.forEach(order => {

      if (order?.items.length > 0){
      const totalValue = order?.items?.reduce((orderSum, product) => 
        orderSum + (product.price * product.quantity || 0),
      0);
      order.totalValue = totalValue;  
      }else{
        console.error('No items order', order);
        order.totalValue = 0; 
      }
    
    });
  }else {
    console.error('No orders');
  }
    return setFilteredData(result) 
  }
  let orderDate = '2024-07-29'
  let status = 'Processing'


  useEffect(() => {
    if (data?.orders) {
      // Fetch orders by date and status
      get_orders_by_date(orderDate, status);
    } else {
      // Use data directly if orders are not present
      console.log(data);
    }
  }, [data, orderDate, status]);
  

  if (!data) return <div>Loading...</div>;



  return (
    <>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <OrderTable data={filteredData}/>

    </>
  );
}
