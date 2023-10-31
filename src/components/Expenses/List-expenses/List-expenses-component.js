import { GetExpenses, DeleteExpenses, EditExpenses } from "../../../API/AxiosExpense";
import { useEffect, useState } from "react";
// import 'antd/dist/antd.css';
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space, Table, Tooltip } from "antd";
import { Content } from "antd/lib/layout/layout";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal } from "../../Modal/Modal";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";

const { Option } = Select;



export function ListExpenses() {

  const [data, setdata] = useState([]);

  const testDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}`
  }



  useEffect(() => {
    let allExpenses = []

    let mydata = (GetExpenses())
      .then(mydata => {
        mydata.forEach((expense) => {
          allExpenses.push({
            key: expense.expenseId,
            amount: expense.amount,
            categoryName: expense.categoryName,
            comment: expense.comment,
            receiver: expense.receiver,
            timeStamp: testDate(expense.timeStamp),

          })
        })
        setdata(allExpenses)
      })


  }, [])

  const onClickDelete = (id) => {
    let allExpenses = [];
    const result = DeleteExpenses(id);
    let mydata = (GetExpenses())
      .then(mydata => {
        mydata.forEach((expense) => {
          allExpenses.push({
            key: expense.expenseId,
            amount: expense.amount,
            categoryName: expense.categoryName,
            comment: expense.comment,
            receiver: expense.receiver,
            timeStamp: testDate(expense.timeStamp),

          })
        })
        setdata(allExpenses)
      })

  }
  //  -------------------------

  const onClickEdit = (id) => {
    setOpenModal(id);
  }
  // -----------------------

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };


  const [openModal, setOpenModal] = useState(false);

  const [modalData, setModalData] = useState();


  const handelChangeModal = (name, data) => {
    setModalData({ ...modalData, [name]: data })
  }

  const handelModalSubmit = async () => {

    await EditExpenses(openModal, modalData);
    setOpenModal(false);
    let allExpenses = [];
    let mydata = (GetExpenses())
      .then(mydata => {
        mydata.forEach((expense) => {
          allExpenses.push({
            key: expense.expenseId,
            amount: expense.amount,
            categoryName: expense.categoryName,
            comment: expense.comment,
            receiver: expense.receiver,
            timeStamp: testDate(expense.timeStamp),

          })
        })
        setdata(allExpenses)
      })
  }


  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
      sortOrder: sortedInfo.columnKey === 'amount' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Receiver',
      dataIndex: 'receiver',
      key: 'receiver',
      sorter: (a, b) => a.receiver.localeCompare(b.receiver),
      sortOrder: sortedInfo.columnKey === 'receiver' ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: 'Time',
      dataIndex: 'timeStamp',
      key: 'timeStamp',
      sorter: (a, b) => a.timeStamp.localeCompare(b.timeStamp),
      sortOrder: sortedInfo.columnKey === 'timeStamp' ? sortedInfo.order : null,
      ellipsis: true,

    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      filters: [
        {
          text: 'Uncategorised',
          value: 'Uncategorised',
        },
        {
          text: 'Food',
          value: 'Food',
        },
        {
          text: 'Other',
          value: 'Other',
        },
        {
          text: 'Entertainment',
          value: 'Entertainment',
        },
        {
          text: 'Housing & Utilities',
          value: 'Housing & Utilities',
        },
        {
          text: 'Transportation',
          value: 'Transportation',
        },

      ],
      filteredValue: filteredInfo.categoryName || null,
      onFilter: (value, record) => record.categoryName.includes(value),
      sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
      sortOrder: sortedInfo.columnKey === 'categoryName' ? sortedInfo.order : null,
      ellipsis: true,

    },
    {
      title: "Delete",
      key: "Delete",
      render: (item) => (
        <div>

          {/* <a className="deleteButton" onClick={DeleteExpense}>Delete</a> */}
          <Button danger onClick={() => onClickDelete(item.key)} type="primary" shape="circle" icon={<DeleteOutlined></DeleteOutlined>}></Button>
        </div>
      )
    },

    {
      title: "Edit",
      key: "Edit",
      render: (item) => (
        <div>
          <Button color="#4169E1" onClick={() => onClickEdit(item.key)} type="primary" shape="circle" icon={<EditOutlined />}></Button>
        </div>
      )
    }


  ];


  return (
    <>

      <Table style={{ height: '100vh' }} size="small" columns={columns} dataSource={data} onChange={handleChange}
        expandable={{
          expandedRowRender: (record) => (
            <p backgroundColor="black"
              style={{
                margin: 0,
              }}
            >
              {record.comment}
            </p>
          ),
        }}
      />
      <Modal open={openModal} >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h5>Edit Expenses</h5>






          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Input name='amount' placeholder="Amount" onChange={e => handelChangeModal(e.target.name, e.target.value)} />
            <Input name='receiver' placeholder="Receiver" onChange={e => handelChangeModal(e.target.name, e.target.value)} />
            <Select name='category' placeholder='Category' onChange={v => handelChangeModal('categoryName', v)}>
              <Select.Option value="Uncategorised">Uncategorised</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Transportation">Transportation</Select.Option>
              <Select.Option value="Entertainment">Entertainment</Select.Option>
              <Select.Option value="Housing">Housing</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>

            <DatePicker placeholder="Date" onChange={e => handelChangeModal('timeStamp', moment().format())} />

            <TextArea rows={3} placeholder="comment" maxLength={6} onChange={e => handelChangeModal('comment', e.target.value)} />

          </div>

          <div>

          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <Button type="primary" onClick={handelModalSubmit}>submit</Button>
            <Button type="primary" danger onClick={() => setOpenModal(false)}>cancel</Button>
          </div>
        </div>
      </Modal>


    </>

  );
};
