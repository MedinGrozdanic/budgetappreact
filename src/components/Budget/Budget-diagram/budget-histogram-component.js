import { useEffect, useState } from 'react';
import Chart from 'react-google-charts'
import './budget-diagram.css'
import { GetHistogramBudget } from "../../../API/AxiosExpense";
//Primary color antD: #1890FF


const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const columnColors = ['#1890FF', '#FF7C00', '#FF0000']

const GetColumnColors = (budgetPercent) => {
    if (budgetPercent < 50)
        return columnColors[0]
    else if (budgetPercent > 89)
        return columnColors[2]
    else
        return columnColors[1]
}

const d = new Date();
document.write("The current month is " + months[d.getMonth()]);

const percentage = (partialValue, totalValue) => {
    // if(totalValue == 0)
    // {
    //     return 0;
    // }
    const result = (100 * partialValue) / totalValue;
    return Math.round(result).toString()
}

export const BudgetHistogramComponent = () => {
    let topsum;
    // const [topsum, setTopsum] = useState(3500); // set to highets spent if higher than highest category topsum in budget
    const [foodBudget, setFoodBudget] = useState([]);
    const [shoppingBudget, setShoppingBudget] =  useState([]);
    const [entertainmentBudget, setEntertainmentBudget] =  useState([]);
    const [homeBudget, setHousingBudget] =  useState([]);
    const [transportBudget, setTransportationBudget] =  useState([]);
    const [otherBudget, setOtherBudget] =  useState([]);



    useEffect(() => {
   
        let data = (GetHistogramBudget())
        .then(data => {
            console.log(data)
         data.forEach((histogramValues) => { 
            topsum = (topsum > Number(histogramValues.maxAmount) ? topsum : Number(histogramValues.maxAmount));
            switch(histogramValues.category.categoryId) {
                case 1:
                    setFoodBudget([histogramValues.maxAmount, histogramValues.amountSpent])
                  break;
                  case 2:

                    setShoppingBudget([histogramValues.maxAmount, histogramValues.amountSpent])
                  break;
                  case 3:
                    setEntertainmentBudget([histogramValues.maxAmount, histogramValues.amountSpent])
                  break;
                  case 4:
                    setHousingBudget([histogramValues.maxAmount, histogramValues.amountSpent])
                  break;
                  case 5:
                    setTransportationBudget([histogramValues.maxAmount, histogramValues.amountSpent])
                  break;
                  case 6:
                    setOtherBudget([histogramValues.maxAmount, histogramValues.amountSpent])
                  break;
                default:
                  break;
              }
         
             })
             topsum = (topsum > 999 ? topsum : 1000);
           }).catch(()=> {
            setFoodBudget([0,0])
            setShoppingBudget([0,0])
            setEntertainmentBudget([0,0])
            setHousingBudget([0,0])
            setTransportationBudget([0,0])
            setOtherBudget([0,0])
            topsum = 1000;
           }
           )
         }, [])
        

    return (
        <div className="budgetDiagramDiv">
            <div className="monthlyBudgetDiv">
                <h1 className='title'>Budget {months[new Date().getMonth()]}</h1>
            </div>
            <Chart
                chartType="ColumnChart"
                options={{
                    colors: ['#e3e3e3'], backgroundColor: "#FFFFFF",
                    series: {
                        0: { targetAxisIndex: 0 }
                    },
                    chartArea: { height: '80%' },
                    title: "Monthly budget",
                    hAxis: { title: "Categories", viewWindow: { min: 0, max: 6, }, },
                    vAxis: { title: "Sum", viewWindow: { min: 0, max: topsum} },
                    legend: "none",
                    allowHtml: true,
                    stackSeries: true,
                    isStacked: true

                }}
                style={{
                    'height': '600px',
                    'display': 'flex',
                    'justify-content': 'center',
                    'minWidth': '1000px'
                }}
                height="600px"
                data={[
                    //Columns
                    ["Categories", "Sum spent", { role: "style" }, { role: "annotation" }, "Sum left in budget"],


                    //Data for columns

                    //FIRST COLUMN
                    ["Food", //CategoryName
                        foodBudget[1], // Sum spent in category
                        GetColumnColors(foodBudget[0] > 0 ? (percentage(foodBudget[1], foodBudget[0])): 0), //Status color, sum spent VS maximum sum in category, if category maxsum isn't set, color should be blue
                        foodBudget[0] > 0 ? percentage(foodBudget[1], foodBudget[0]) + "%" : "", // Percentage spent of maximum sum
                        foodBudget[0] - foodBudget[1]], // Colum on top of spent-column showing how much there's left to spend in that category before spending over budget

                    //SECOND COLUMN
                    ["Transportation",
                        transportBudget[1],
                        GetColumnColors(transportBudget[0] > 0 ? (percentage(transportBudget[1], transportBudget[0])): 0),
                        transportBudget[0] > 0 ? percentage(transportBudget[1], transportBudget[0]) + "%": "",
                        transportBudget[0] - transportBudget[1]],

                    //THIRD COLUMN
                    ["Shopping",
                        shoppingBudget[1],
                        GetColumnColors(shoppingBudget[0] > 0 ? (percentage(shoppingBudget[1], shoppingBudget[0])):0),
                        shoppingBudget[0]> 0 ? percentage(shoppingBudget[1], shoppingBudget[0]) + "%": "",
                        shoppingBudget[0] - shoppingBudget[1]],

                    //FOURTH COLUMN
                    ["Entertainment",
                        entertainmentBudget[1],
                        GetColumnColors(entertainmentBudget[0] > 0 ? (percentage(entertainmentBudget[1], entertainmentBudget[0])): 0),
                        entertainmentBudget[0] > 0 ? percentage(entertainmentBudget[1], entertainmentBudget[0]) + "%" : "",
                        entertainmentBudget[0] - entertainmentBudget[1]],

                    //FIFTH COLUMN
                    ["Housing & Utilities",
                        homeBudget[1],
                        GetColumnColors(homeBudget[0] > 0 ? (percentage(homeBudget[1], homeBudget[0])): 0),
                        homeBudget[0] > 0 ? percentage(homeBudget[1], homeBudget[0]) + "%" : "",
                        homeBudget[0] - homeBudget[1]],

                    //SIXTH COLUMN
                    ["Other",
                        otherBudget[1],
                        GetColumnColors(otherBudget[0] > 0 ? (percentage(otherBudget[1], otherBudget[0])): 0),
                        otherBudget[0] > 0 ? percentage(otherBudget[1], otherBudget[0]) + "%": "",
                        otherBudget[0] - otherBudget[1]]]}
            />
        </div>
    );

}

