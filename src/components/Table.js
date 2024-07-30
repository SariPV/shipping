import styles from "@/styles/Table.module.css";
import React from "react";


const OrderTable = (props) => {
    const { data } = props

    return (

        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles?.tb_head}>Order ID</th>
                    <th className={styles?.tb_head}>Customer ID</th>
                    <th className={styles?.tb_head}>Order Date</th>
                    <th className={styles?.tb_head}>Status</th>
                    <th className={styles?.tb_head}>Total Value</th>
                </tr>
            </thead>
            <tbody>
                {data && data?.map(item => (
                    <tr  key={item?.orderId}>
                        <td className={styles?.value}>{item?.orderId}</td>
                        <td className={styles?.value}>{item.customerId}</td>
                        <td className={styles?.value}>{item.orderDate}</td>
                        <td className={styles?.value}>{item.status}</td>
                        <td className={styles?.value}>${item.totalValue}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

}
export default OrderTable;