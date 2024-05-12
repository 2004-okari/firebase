import React, { useEffect, useState } from 'react';
import { Modal, Input, DatePicker, Space, Form, Select, Checkbox } from 'antd';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { IoEllipsisVerticalCircleOutline } from 'react-icons/io5';
import { db, authentication } from '../Firebase/firebase.config';
import './Task.css';

const { RangePicker } = DatePicker;

const FirebaseFirestore = () => {
  const user = authentication.currentUser;
  const userId = user ? user.uid : null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('high');
  const [status, setStatus] = useState('pending');
  const [date, setDate] = useState([]);

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
        task: taskName,
        priority,
        date: date.join(' - '), // Combine selected date range into a string
        status,
      });

      // Clear form fields after adding the task
      setTaskName('');
      setPriority('high');
      setStatus('pending');
      setDate([]);
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
                fontWeight: '700',
                margin: 0,
              }}
            >
              Good Morning,{' '}
              <span
                style={{
                  fontFamily: 'Simonetta',
                  fontWeight: '500',
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
              <p
                style={{
                  margin: '0 8px',
                }}
              >
                {task.task}
              </p>
              <p
                style={{
                  margin: '0 8px',
                }}
              >
                {task.priority}
              </p>
              <p
                style={{
                  margin: '0 8px',
                }}
              >
                {task.date}
              </p>
              <p
                style={{
                  margin: '0 8px',
                }}
              >
                {task.status}
              </p>
              <IoEllipsisVerticalCircleOutline
                onClick={() => (
                  <Form.Item>
                    <Select onChange={() => {}}>
                      <Select.Option value="high">High</Select.Option>
                      <Select.Option value="medium">Medium</Select.Option>
                      <Select.Option value="low">Low</Select.Option>
                    </Select>
                  </Form.Item>
                )}
              />
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
          <Input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </Form.Item>
        <p
          style={{
            margin: '0 0 8px 0',
          }}
        >
          Priority:
        </p>
        <Form.Item>
          <Select value={priority} onChange={(value) => setPriority(value)}>
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
          <Select value={status} onChange={(value) => setStatus(value)}>
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
          <RangePicker value={date} onChange={(dates) => setDate(dates)} />
        </Space>
      </Modal>
    </div>
  );
};

export default FirebaseFirestore;
