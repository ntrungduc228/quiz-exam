import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';

const { SearchBar } = Search;

const TableList = ({ title, dataList, columns, keyField, isShowButtonCreate, isShowModal, setIsShowModal, handleCreateNew }) => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">{title}</Card.Title>
              {/* <span className="d-block m-t-5">
                use bootstrap <code>Table</code> component
              </span> */}
            </Card.Header>
            <Card.Body>
              <ToolkitProvider bootstrap4 keyField={keyField} data={dataList} columns={columns} search>
                {(props) => (
                  <div>
                    <div className="col-12 d-flex justify-content-between flex-wrap">
                      <div className="col-sm-12 col-md-6">
                        {isShowButtonCreate && (
                          <Button variant="info" onClick={() => handleCreateNew()}>
                            <i className="feather icon-plus" />
                            Thêm mới
                          </Button>
                        )}
                      </div>
                      <div className="col-sm-12 col-md-6 d-flex justify-content-end">
                        <SearchBar {...props.searchProps} placeholder="Tìm kiếm..." style={{ width: '320px' }} />
                      </div>
                    </div>
                    <hr />

                    <BootstrapTable
                      // headerWrapperClasses="bg-primary"
                      striped
                      classes={window.innerWidth < 768 ? 'table-responsive' : ''}
                      pagination={paginationFactory()}
                      noDataIndication="Không tìm thấy dữ liệu..."
                      {...props.baseProps}
                      filter={filterFactory()}
                      // filterPosition="top"
                    />
                  </div>
                )}
              </ToolkitProvider>

              {/* <BootstrapTable bootstrap4 keyField="id" data={data} columns={columns} striped pagination={paginationFactory(options)} /> */}
            </Card.Body>
          </Card>
        </Col>{' '}
      </Row>{' '}
    </React.Fragment>
  );
};

export default TableList;
