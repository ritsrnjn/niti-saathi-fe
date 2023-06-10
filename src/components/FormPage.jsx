import React, { useState } from 'react';
import { Button, Form, Spinner, Container, Row, Col, Alert, Card, Table } from 'react-bootstrap';
import '../styles/FormPage.css';
import axios from 'axios';

const FormPage = () => {
  const [state, setState] = useState({
    name: '',
    age: '',
    gender: '',
    salary: '',
    caste: '',
    state: '',
    additionalInfo: ''
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

    const query = `My name is ${state.name} my age is ${state.age} my salary is ${state.salary} my caste is ${state.caste} ... Based on the information provided, which policies are applicable to ${state.name}? Please provide a list of up to three policies along with a brief summary of each. Additionally, kindly include some insights on why each policy is helpful and what is the financials benefits"`;

    try {

      const response = await axios.post('http://127.0.0.1:5000/api', { query });

      setResponse(response.data);  // Add this line

      console.log(response.data);


      setLoading(false);
    } catch (error) {
      console.error(error);

      // setResponse(error);

      // make a sample response object with the same structure as the response object
      const errorResponse = {
        data: 
          [
            {
              policy: 'Policy 1',
              summary: 'Summary 1',
              benefits: 'Benefits 1'
            },
            {
              policy: 'Policy 2',
              summary: 'Summary 2',
              benefits: 'Benefits 2'
            }
          ]
      };

      setResponse(errorResponse.data);
      // getting this error
      // response.map is not a function
// TypeError: response.map is not a function

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

                    <Form.Group controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control type="number" name="gender" onChange={handleChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formSalary">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="number" name="salary" onChange={handleChange} />
                    </Form.Group>
                    
                    <Form.Group controlId="formCaste">
                    <Form.Label>Caste</Form.Label>
                    <Form.Control type="text" name="caste" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group controlId="formState">
                    <Form.Label>State</Form.Label>
                    <Form.Control type="text" name="state" onChange={handleChange} />
                    </Form.Group>

                </Col>
                  <Col md={6}>
                    <Form.Group controlId="formRemarks">
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control type="text" name="remarks" onChange={handleChange} as="textarea" rows={3} />
                    </Form.Group>

                  <div className="text-center">
                  <Button variant="success" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
                  </Button>
                  </div>

                  </Col>
                </Row>

              </Form>
            </Card.Body>
          </Card>
          {response && 
        <Row className="justify-content-md-center mt-3">
          <Col xs={12} md={8}>
            <Card className="response-card">
              <Card.Body>
                <Card.Title>Policies for you</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Policy</th>
                      <th>Summary</th>
                      <th>Benefits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {response.map((policy, index) => (
                      <tr key={index}>
                        <td>{policy.policy}</td>
                        <td>{policy.summary}</td>
                        <td>{policy.benefits}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      }
        </Col>
      </Row>
    </Container>
  );
};


export default FormPage;


/*
Okay, now let's improve the response part

The api will response in this format
[
{
    "policy": "policy1",
    "summary": "summary1"
    "benifits": "benifits1"
},
{
    "policy": "policy2",
    "summary": "summary2"
    "benifits": "benifits2"
},
]

We want to show it as a table on the frontend each element in a row. Make the table look really nice. Use your creativity here


*/