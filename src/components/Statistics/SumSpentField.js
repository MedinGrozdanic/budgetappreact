import { useEffect, useState } from "react"
import "./Statistics.css"
import { Col, Row } from "antd";
import { GetSumSpentYearAndMonth } from "../../API/AxiosExpense";



export const SumSpentField = () => {
    const [sumSpentMonth, setSumSpentMonth] = useState();
    const [sumSpentYear, setSumSpentYear] = useState();


    useEffect(() => {
        //Get Sum spent this year and this month and set values in useState
        const sums = GetSumSpentYearAndMonth()
        sums.then((data) => {

            setSumSpentMonth(data.spentThisMonth);
            setSumSpentYear(data.spentThisYear);
        })
    }, [])





    return (
        <>
            <div className="spentSumFieldDiv">
                <Row justify="space-between">
                    <Col >
                        <h2 className="sumSpentFieldText">Spent this year: {sumSpentYear}</h2>
                    </Col>
                    <Col>
                        <h2 className="sumSpentFieldText">Spent this month: {sumSpentMonth}</h2>
                    </Col>
                </Row>

            </div>

        </>
    )

}