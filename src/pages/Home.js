import { Col, Row } from "antd";
import { BudgetHistogramComponent } from "../components/Budget/Budget-diagram/budget-histogram-component";
import LineChartComponent from "../components/Statistics/Expenses-linechart";
import { PieChartComponent } from "../components/Statistics/Expenses-pie-chart";
import { SumSpentField } from "../components/Statistics/SumSpentField";


const Home = () => {
    return (
        <div>
            <Row justify='center'>
                <Col span={24}>
                    <BudgetHistogramComponent />
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={23}>
                    <SumSpentField />
                </Col>
            </Row>
            <Row align="top" justify='center'>
                <Col span={12}>
                    <LineChartComponent />
                </Col>
                <Col span={1}></Col>
                <Col span={10}>
                    <PieChartComponent />
                </Col>
            </Row>
        </div>
    );
};


export default Home