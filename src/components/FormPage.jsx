import React, { useState } from 'react';
import { Button, Form, Spinner, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import '../styles/FormPage.css';
import axios from 'axios';

const FormPage = () => {
  const [state, setState] = useState({
    name: '',
    age: '',
    salary: '',
    caste: '',
    remarks: ''
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    const query = `My name is ${state.name} my age is ${state.age} my salary is ${state.salary} my caste is ${state.caste} ... what policies are applicable for me? Give just the list of policies and theier short summary, if no policies are applicalbe just say "No applicable policies found"`;

    try {
      const response = await axios.post('http://127.0.0.1:5000/api', { query });

      setResponse(response.data);  // Add this line

      console.log(response.data);


      setLoading(false);
    } catch (error) {
      console.error(error);

      setResponse(error);
      setLoading(false);
    }
  };

//   return (
//     <Container className="form-page">
//       <Form onSubmit={handleSubmit}>
//         <Row>
        //   <Col>
        //     <Form.Group controlId="formName">
        //       <Form.Label>Name</Form.Label>
        //       <Form.Control type="text" name="name" onChange={handleChange} />
        //     </Form.Group>
            
        //     <Form.Group controlId="formAge">
        //       <Form.Label>Age</Form.Label>
        //       <Form.Control type="number" name="age" onChange={handleChange} />
        //     </Form.Group>
            
        //     <Form.Group controlId="formSalary">
        //       <Form.Label>Salary</Form.Label>
        //       <Form.Control type="number" name="salary" onChange={handleChange} />
        //     </Form.Group>
            
        //     <Form.Group controlId="formCaste">
        //       <Form.Label>Caste</Form.Label>
        //       <Form.Control type="text" name="caste" onChange={handleChange} />
        //     </Form.Group>
        //   </Col>
//           <Col>
//             <Form.Group controlId="formRemarks">
//               <Form.Label>Remarks</Form.Label>
//               <Form.Control type="text" name="remarks" onChange={handleChange} as="textarea" rows={3} />
//             </Form.Group>

//             <Button variant="success" type="submit" disabled={loading}>
//                 {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
//             </Button>
//           </Col>
//         </Row>
        
//       </Form>
//       {response && 
//         <Alert variant="secondary" className="mt-3 response-box">
//           <Alert.Heading>Policies for you</Alert.Heading>  {/* Change the heading */}
//           <p>{JSON.stringify(response.data, null, 2)}</p>  {/* Show only response.data */}
//         </Alert>
//       }
//     </Container>
//   );
// };

return (
    <Container className="form-page">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                <Col>
                    <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={handleChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" name="age" onChange={handleChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formSalary">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="number" name="salary" onChange={handleChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formCaste">
                    <Form.Label>Caste</Form.Label>
                    <Form.Control type="text" name="caste" onChange={handleChange} />
                    </Form.Group>
                </Col>
                  <Col md={6}>
                    {/* ... */}
                  </Col>
                </Row>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
          {response && 
            <Alert variant="secondary" className="mt-3 response-box">
              <Alert.Heading>Policies for you</Alert.Heading>
              <p>{JSON.stringify(response.data, null, 2)}</p>
            </Alert>
          }
        </Col>
      </Row>
    </Container>
  );
};


export default FormPage;
