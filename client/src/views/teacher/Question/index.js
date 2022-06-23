import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Modal, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import NavIcon from '../../../layouts/AdminLayout/Navigation/NavContent/NavIcon';

const { SearchBar } = Search;

const Question = () => {
  const [data, setData] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const columns = [
    {
      dataField: 'id',
      text: 'id',
      sort: true
    },
    {
      dataField: 'userId',
      text: 'userId ID',
      sort: true
    },
    {
      dataField: 'title',
      text: 'Title',
      sort: true
    },
    {
      dataField: '',
      text: 'completed',
      // isDummyField: true,
      sort: false,
      formatter: (cellContent, row, rowIndex, abc) => {
        console.log('cel', cellContent);
        console.log('row', row);
        console.log('rowIndex', rowIndex);
        console.log('abc', abc);
        return (
          <>
            <Button key={rowIndex} onClick={() => setLgShow(true)}>
              Large modal
            </Button>
            <Button key={(rowIndex + 1) * 40} onClick={() => setLgShow(true)}>
              <span className="pcoded-micon">
                <i className="feather icon-info" />
              </span>
            </Button>
          </>
        );
      }
    }
  ];

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Basic Table</Card.Title>
              <span className="d-block m-t-5">
                use bootstrap <code>Table</code> component
              </span>
            </Card.Header>
            <Card.Body>
              <ToolkitProvider bootstrap4 keyField="id" data={data} columns={columns} search>
                {(props) => (
                  <div>
                    {/* <h3>Input something at below input field:</h3> */}
                    <div className="col-12 d-flex justify-content-between">
                      <Button onClick={() => setLgShow(true)}>Large modal</Button>
                      <SearchBar {...props.searchProps} placeholder="Search Something!!!" style={{ width: '320px' }} />
                    </div>
                    <hr />
                    <BootstrapTable
                      // headerWrapperClasses="bg-primary"
                      striped
                      pagination={paginationFactory()}
                      noDataIndication="Table is Empty"
                      {...props.baseProps}
                    />
                  </div>
                )}
              </ToolkitProvider>
              <Modal size="lg" show={lgShow} onHide={() => setLgShow(false)} aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">Large Modal</Modal.Title>
                </Modal.Header>
                <Modal.Body>...</Modal.Body>
              </Modal>
              {/* <BootstrapTable bootstrap4 keyField="id" data={data} columns={columns} striped pagination={paginationFactory(options)} /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Question;
