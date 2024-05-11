import React, { useEffect, useState } from 'react';
import { Modal, Input, DatePicker, Space, Form, Select, Checkbox } from 'antd';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db, authentication } from '../Firebase/firebase.config';
import './Task.css';

const { RangePicker } = DatePicker;

const FirebaseFirestore = () => {
  const user = authentication.currentUser;
  const userId = user ? user.uid : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from Firestore when component mounts
    const unsubscribe = onSnapshot(
      collection(db, `users/${userId}/tasks`),
      (querySnapshot) => {
        const fetchedTasks = [];
        querySnapshot.forEach((doc) => {
          fetchedTasks.push({ id: doc.id, ...doc.data() });
        });
        setTasks(fetchedTasks);
      }
    );

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [userId]); // Ensure useEffect runs only when userId changes

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    setIsModalOpen(false);

    try {
      // Add a new document to the user's tasks collection
      await addDoc(collection(db, `users/${userId}/tasks`), {
        task: 'Ada',
        priority: 'high',
        date: '12-07-2024',
        status: 'completed',
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div className="container">
      <div className="outerdiv">
        <div className="innerdiv">
          <div className="header">
            <h1
              style={{
                fontSize: '20px',
                fontFamily: 'Lato',
                fontWeight: '600',
                margin: 0,
              }}
            >
              Good Morning,{' '}
              <span
                style={{
                  fontFamily: 'Simonetta',
                }}
              >
                {user.displayName}
              </span>
            </h1>
            <p>
              Today,
              {new Date().toDateString()}
            </p>
          </div>
          <button className="button" type="button" onClick={showModal}>
            Add Task
          </button>
        </div>
        <div className="taskcontainer">
          {tasks.map((task) => (
            <div className="taskcase" key={task.id}>
              <Checkbox />
              <p>{task.task}</p>
              <p>{task.priority}</p>
              <p>{task.date}</p>
              <p>{task.status}</p>
            </div>
          ))}
        </div>
      </div>
      <Modal
        title="Add Task"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p
          style={{
            margin: '12px 0 8px 0',
          }}
        >
          Task
        </p>
        <Form.Item>
          <Input />
        </Form.Item>
        <p
          style={{
            margin: '0 0 8px 0',
          }}
        >
          Priority:
        </p>
        <Form.Item>
          <Select>
            <Select.Option value="high">High</Select.Option>
            <Select.Option value="medium">Medium</Select.Option>
            <Select.Option value="low">Low</Select.Option>
          </Select>
        </Form.Item>
        <p
          style={{
            margin: '0 0 8px 0',
          }}
        >
          Status:
        </p>
        <Form.Item>
          <Select>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="inProgress">In Progress</Select.Option>
          </Select>
        </Form.Item>
        <p
          style={{
            margin: '0 0 8px 0',
          }}
        >
          Date:
        </p>
        <Space direction="vertical" size={12}>
          <RangePicker />
        </Space>
      </Modal>
    </div>
  );
};

export default FirebaseFirestore;
