const { Firestore } = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'bulgassadmin',
  keyFilename: './serviceAccountKey.json',
});

const addStudent = async (student) => {
  try {
    if (!student || !student.id || !student.name || !student.age) {
      throw new Error('Invalid student data');
    }

    console.log('Adding student:', student);

    const docRef = firestore.collection('students').doc(student.id);
    await docRef.set(student);

    console.log('Student added successfully');
  } catch (error) {
    console.error('Error adding student:', error.message);
    console.error('Stack trace:', error.stack);
  }
};

const student = {
  id: 'student1',
  name: 'John Doe',
  age: 21,
};

addStudent(student).catch((error) => {
  console.error('Unhandled error:', error);
});