import { useEffect, useState } from 'react';
import Chart from 'react-google-charts'
import { GetSum } from '../../API/AxiosExpense';

export const PieChartComponent = ()=>{
const [category, setCategory] = useState({});

useEffect (()=>{
    const categories = GetSum()
    console.log(categories)
    categories.then((data=>{
        setCategory(data)
    }))
},[])


const foodCategory = category.foodCategorySpent;
const shoppingCategory = category.shoppingCategorySpent
const transportCategory = category.transportationCategorySpent
const entertainmentCategory = category.entertainmentCategorySpent
const housingCategory = category.housingCategorySpent
const otherCategory = category.otherCategorySpent;

const datas = [
["Category", "Expenses"],
["Food", foodCategory],
["Shopping", shoppingCategory],
["Transport", transportCategory],
["Entertainment", entertainmentCategory],
["Housing", housingCategory],
["Other", otherCategory]

]

const options = {
    title: "Spent per category",
    chartArea: {width: '90%'},
    pieHole: 0.4,
    is3D: false,
    colors: ["#52c41a","#eb2f96","#096dd9","#722ed1","#fa541c","#bfbfbf"],
};


    return(
        <Chart className='pie-chart' chartType='PieChart'
        width={"100%"}
        height={"400px"}
            data={datas}
            options={options}
        />
    )
}