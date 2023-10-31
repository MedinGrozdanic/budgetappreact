import axios from "axios";

export function GetExpenses() {
  const parsedToken = JSON.parse(localStorage.getItem('token'));

  return (
    axios.get('http://localhost:49809/Expense', { headers: {"Authorization" : `Bearer ${parsedToken}`} })
    
      .then((response) => {
        console.log("GetExpenses done")
        const data = response.data;
        return (
          data

        )
      })
  )
}




export const GetSum = () => {

  const parsedToken = JSON.parse(localStorage.getItem('token'));

  return (
    axios.get('http://localhost:49809/PieChart', { headers: {"Authorization" : `Bearer ${parsedToken}`} })
      .then((res) => {
        const data = res.data;
        return data
      })
  )
}


export const GetSumSpentYearAndMonth = () => {
  const parsedToken = JSON.parse(localStorage.getItem('token'));

  return (
    axios.get('http://localhost:49809/Expense/TotalSumsSpent', { headers: {"Authorization" : `Bearer ${parsedToken}`} })
      .then((res) => {
        const data = res.data;
        return data
      })
  )
}
export const GetSumSpentPerMonth = () => {
  const parsedToken = JSON.parse(localStorage.getItem('token'));

  return (
    axios.get('http://localhost:49809/SpentPerMonth/', { headers: {"Authorization" : `Bearer ${parsedToken}`} })
      .then((res) => {
        const data = res.data;
        return data
      })
  )
}


export const CreateExpense = async (formData) => {
  const parsedToken = JSON.parse(localStorage.getItem('token'));
  await axios({

              method: "post",
              url: 'http://localhost:49809/Expense',
              data: {
                  "amount": formData.amount,
                  "receiver": formData.receiver,
                  "timeStamp": formData.timeStamp,
                  "comment": formData.comment,
                  "categoryName": formData.categoryName
                }, headers: {"Authorization" : `Bearer ${parsedToken}`} 
            })
        }
          
export const PostBudget = async (formData) => {
   const parsedToken = JSON.parse(localStorage.getItem('token'));
      await axios({
        
              method: "post",
              url: 'http://localhost:49809/Budget',
              data: {
                   "amount": formData.amount,
                   "budgetName": formData.name,
                   "startDate": formData.startDate,
                   "endDate": formData.endDate,
                   "userId": formData.userId,
                   "categoryName": formData.categoryName
                },
               headers: { "Content-Type": "application/json" }
             })
          }
// export function GetBudget() {
//    const parsedToken = JSON.parse(localStorage.getItem('token'));
          
//    return (
//               axios.get('http://localhost:49809/Budget/' + parsedToken)
//                 .then((response) => {
//                   console.log("GetBudget done")
//                   const data = response.data;
//                   return (
//                     data
          
//                   )
//                 })
//             )
//           }
              
// export function DeleteBudget (id)  {
    
//     const parsedToken = JSON.stringify(id)
//        return(
//             axios.delete('http://localhost:49809/Budget/'+id)         
//             .then((response) => {
//                 const data = response.data;
//                 return(
//                     data
          
//                   )
//                 })
//             )
//           }          

export function DeleteExpenses (id)  {
   
  const parsedToken = JSON.parse(localStorage.getItem('token'));
  return(
  axios.delete('http://localhost:49809/Expense/'+id,  { headers: {"Authorization" : `Bearer ${parsedToken}`} })         
  .then((response) => {
      const data = response.data;
      return(
          data

        )
      })
  )
}

export function EditExpenses (id, data)  {
  const parsedToken = JSON.parse(localStorage.getItem('token'));
  return(
  axios.put('http://localhost:49809/Expense/'+id, {...data}, 
  { headers: {"Authorization" : `Bearer ${parsedToken}`} }) 

  .then((response) => {
      return response;
  })
  )
}

export const GetHistogramBudget = () => {
  const parsedToken = JSON.parse(localStorage.getItem('token'));

  return(
    axios.get('http://localhost:49809/Budget/histogram', { headers: {"Authorization" : `Bearer ${parsedToken}`} })
      .then((res) => {
        const data = res.data;
        return data
      })
  )
}