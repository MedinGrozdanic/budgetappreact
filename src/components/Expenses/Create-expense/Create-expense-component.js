// import 'antd/dist/antd.css';
import '../Expenses.css';
import React from 'react';
import { useState } from 'react';
import {CreateExpense} from "../../../API/AxiosExpense";
import moment from 'moment';

import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
} from 'antd';
const { TextArea } = Input;

export function CreateExpenseForm ({ handleNewExpenseForm }) {

    const [form] = Form.useForm();
    const [amount,setAmount] = useState("");
    const [receiver, setReciever] = useState("");
    const [categoryName, setCategory] = useState("");
    const [timeStamp, setDate] = useState("");
    const [comment, setComment] = useState("");
   
    const formData = [];

    const changeAmount = (event) =>{
        setAmount(event);
        }

    const changeReciever = (event) =>{
            setReciever(event.target.value);
        }

    const changeDate = () =>{
            setDate(moment().format());
        }

    const changeComment = (event) =>{

            setComment(event.target.value);
        }
    
    const handleSubmit = () => {
  
        formData.amount = amount;
        formData.receiver = receiver;
        formData.comment = comment;
        formData.timeStamp = timeStamp;
        formData.categoryName = categoryName;
        CreateExpense(formData)
        .then(() => {

          handleNewExpenseForm();
          form.resetFields();
        })
    };

  return (
    <>
      <Form className='expenseForm' 
      onFinish={handleSubmit}
      form={form}
      autoComplete="off"
      >
        <Form.Item 
        label="Amount"
        name="amount"
        rules={[
          {  
            required: true,
            message: 'Please input the amount!',
          },
        ]}
      >
        <InputNumber  min={0} max={99999999} onChange={changeAmount} />
        </Form.Item>
        <Form.Item label="Reciever"
        name="reciever"
        rules={[
          {
            required: true,
            message: 'Please input the reciever!',
          },
        ]}>
          <Input onChange={changeReciever}/>
        </Form.Item>
        <Form.Item 
        label="Category"
        name="categoryName"
        rules={[
          {
            required: true,
            message: 'Please enter a category',
          },
        ]}>
          <Select onChange={setCategory}>
          <Select.Option value="Shopping">Shopping</Select.Option>
            <Select.Option value="Food">Food</Select.Option>
            <Select.Option value="Transportation">Transportation</Select.Option>
            <Select.Option value="Entertainment">Entertainment</Select.Option>
            <Select.Option value="Housing">Housing</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item 
        label="Date"
        name="timeStamp"
        rules={[
          {
            required: true,
            message: 'Please enter a date',
          },
        ]}>
          <DatePicker defaultValue={moment()} onChange={changeDate}/>
        </Form.Item>
        <Form.Item label="Comment"
        name="comment">
          <TextArea onChange={changeComment}/>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
        </Form.Item>
      </Form>
    </>
  );
};


