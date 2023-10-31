import { useEffect, useState } from 'react';
import Chart from 'react-google-charts'
import { GetSumSpentPerMonth} from '../../API/AxiosExpense';

export default function LineChartComponent() {
    const [sumSpentYear, setSumSpentYear] = useState({});

useEffect(() => {
        const sums = GetSumSpentPerMonth()
        sums.then((data) => {
            setSumSpentYear(data);
    })
}, [])


const january = sumSpentYear.sumJanuary;
const february = sumSpentYear.sumFebruary;
const march = sumSpentYear.sumMarch;
const april = sumSpentYear.sumApril;
const may = sumSpentYear.sumMay;
const june = sumSpentYear.sumJune;
const july = sumSpentYear.sumJuly;
const august = sumSpentYear.sumAugust;
const september =sumSpentYear.sumSeptember;
const october = sumSpentYear.sumOctober;
const november = sumSpentYear.sumNovember;
const december = sumSpentYear.sumDecember;

const datas = [
["Category", "Expenses"],
["January", january],
["February", february],
["March", march],
["April", april],
["May", may],
["June", june],
["July", july],
["August", august],
["September", september],
["Oktober", october],
["November", november],
["December", december]
]
    const options = {
        title: "Spent this year",
        legend: 'none',
        hAxis: { minValue: 0, maxValue: 9 },
        curveType: 'function',
        pointSize: 12,
        dataOpacity: 0.7
    };

    return(
        <>
         <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={datas}
      options={options}
    />
        </>
    )


}