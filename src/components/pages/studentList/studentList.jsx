import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './studentList.css';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const StudentList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [editPaymentStatus, setEditPaymentStatus] = useState('');
  const [editPhoneNumber, setEditPhoneNumber] = useState('');

  const navigate = useNavigate(); 

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const toggleEditModal = (student) => {
    setCurrentStudent(student);
    setEditName(student.name);
    setEditCourse(student.course);
    setEditPaymentStatus(student.paymentStatus);
    setEditPhoneNumber(student.phoneNumber);
    setShowEditModal(!showEditModal);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsList);
    };
    fetchStudents();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'students'), {
        name,
        course,
        paymentStatus,
        phoneNumber,
      });
      alert('Student successfully added');
      toggleAddModal();
      setName('');
      setCourse('');
      setPaymentStatus('');
      setPhoneNumber('');
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsList);
    } catch (error) {
      console.error('Error adding student: ', error);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      if (selectedStudentId) {
        await deleteDoc(doc(db, 'students', selectedStudentId));
        alert('Student successfully deleted');
        setSelectedStudentId(null);
        toggleDeleteModal();
        const querySnapshot = await getDocs(collection(db, 'students'));
        const studentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudents(studentsList);
      }
    } catch (error) {
      console.error('Error deleting student: ', error);
    }
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();
    if (currentStudent) {
      try {
        await updateDoc(doc(db, 'students', currentStudent.id), {
          name: editName,
          course: editCourse,
          paymentStatus: editPaymentStatus,
          phoneNumber: editPhoneNumber,
        });
        alert('Student successfully updated');
        setShowEditModal(false);
        const querySnapshot = await getDocs(collection(db, 'students'));
        const studentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudents(studentsList);
      } catch (error) {
        console.error('Error updating student: ', error);
      }
    }
  };

  return (
    <div className="student-list-page">
      <header className="student-list-header">
        <h1>Student List</h1>
      </header>

      <section className="button-section">
        <button className="add-student-btn" onClick={toggleAddModal}>Add Student</button>
        <button className="delete-student-btn" onClick={toggleDeleteModal}>Delete Student</button>
        <button className="back-home-btn" onClick={() => navigate('/')}>Back to Home</button> {/* Back button */}
      </section>

      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={toggleAddModal}>&times;</span>
            <h2>Add New Student</h2>
            <form onSubmit={handleAddStudent}>
              <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required
              />
              <input 
                type="text" 
                placeholder="Course" 
                value={course} 
                onChange={(e) => setCourse(e.target.value)} 
                required
              />
              <input 
                type="text" 
                placeholder="Payment Status" 
                value={paymentStatus} 
                onChange={(e) => setPaymentStatus(e.target.value)} 
                required
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                required
              />
              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={toggleDeleteModal}>&times;</span>
            <h2>Delete Student</h2>
            <select onChange={(e) => setSelectedStudentId(e.target.value)} value={selectedStudentId}>
              <option value="">Select a student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>{student.name}</option>
              ))}
            </select>
            <button onClick={handleDeleteStudent} className="submit-btn">Delete Student</button>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={() => setShowEditModal(false)}>&times;</span>
            <h2>Edit Student Details</h2>
            <form onSubmit={handleEditStudent}>
              <input 
                type="text" 
                placeholder="Name" 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
                required
              />
              <input 
                type="text" 
                placeholder="Course" 
                value={editCourse} 
                onChange={(e) => setEditCourse(e.target.value)} 
                required
              />
              <input 
                type="text" 
                placeholder="Payment Status" 
                value={editPaymentStatus} 
                onChange={(e) => setEditPaymentStatus(e.target.value)} 
                required
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={editPhoneNumber} 
                onChange={(e) => setEditPhoneNumber(e.target.value)} 
                required
              />
              <button type="submit" className="submit-btn">Update</button>
            </form>
          </div>
        </div>
      )}

      <div className="student-list">
        {students.map((student) => (
          <div className="student-card" key={student.id}>
            <h3>{student.name}</h3>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Payment Status:</strong> {student.paymentStatus}</p>
            <p><strong>Phone:</strong> {student.phoneNumber}</p>
            <button className="edit-student-btn" onClick={() => toggleEditModal(student)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;