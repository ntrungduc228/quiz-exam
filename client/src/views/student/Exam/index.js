import React, { useState } from 'react';
import { Row, Col, Card, Table, Modal, Button, Form, Collapse } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Exam = () => {
  const [isBasic, setIsBasic] = useState(true);
  let arr = [];
  for (let i = 0; i < 60; i++) {
    arr.push(i);
  }
  return (
    <React.Fragment>
      <Row>
        <Col md={7}>
          <Card>
            <Card.Header>
              <h4 style={{}}>Featured This is some text within a card body.</h4>
            </Card.Header>
            <Card.Body>
              <PerfectScrollbar>
                <Form style={{}}>
                  <Form.Group>
                    <Form.Check
                      className="mb-3"
                      custom
                      type="radio"
                      label="Toggle this custom radio"
                      name="supportedRadios"
                      id="supportedRadio3"
                    />
                    <Form.Check
                      className="mb-3"
                      custom
                      type="radio"
                      label="Or toggle this other custom radio"
                      name="supportedRadios"
                      id="supportedRadio4"
                    />
                    <Form.Check
                      className="mb-3"
                      custom
                      type="radio"
                      label="Toggle this custom radio"
                      name="supportedRadios"
                      id="supportedRadio3"
                    />
                    <Form.Check custom type="radio" label="Or toggle this other custom radio" name="supportedRadios" id="supportedRadio4" />
                  </Form.Group>
                </Form>
              </PerfectScrollbar>
            </Card.Body>
            <Card.Footer>
              <Col className="mb-4">
                <h6 onClick={() => alert('click h6')} className="font-weight-bold text-danger" style={{ cursor: 'pointer' }}>
                  Xóa câu trả lời
                </h6>
              </Col>
              <div className="d-flex justify-content-between">
                <Button variant="info" className="text-capitalize">
                  info
                </Button>{' '}
                <Button variant="info" className="text-capitalize">
                  info
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={5}>
          <Card>
            <Card.Header>
              Featured
              <div className="border-top" style={{ marginLeft: '-25px', marginRight: '-25px' }}>
                <Button className="ml-3 mt-3" onClick={() => setIsBasic(!isBasic)}>
                  Collapse Button
                </Button>
              </div>
            </Card.Header>
            <Collapse in={isBasic}>
              <div id="basic-collapse">
                <Card.Body>
                  <PerfectScrollbar>
                    <div style={{ height: '250px' }}>
                      <Row>
                        <Col className="d-flex flex-wrap">
                          {arr.map((item) => {
                            return (
                              <Button variant="light" className="text-capitalize" key={item} style={{ width: '70px' }}>
                                {item * 10}
                              </Button>
                            );
                          })}
                        </Col>
                      </Row>
                    </div>
                  </PerfectScrollbar>
                </Card.Body>
              </div>
            </Collapse>

            <Card.Footer>
              <Button variant="danger" className="text-capitalize">
                <span>Nộp bài</span>
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Exam;
