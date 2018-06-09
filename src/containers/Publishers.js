import React, { Component } from 'react';
import { get, post } from './../lib/network';
import Table from './../components/Table';
import Search from './../components/Search';
import CustomPagination from './../components/CustomPagination';
import EditModal from './../components/EditModal';
import _ from 'lodash';

class Publishers extends Component {

  constructor(props){
    super(props);

    this.state = {
      publishers: [],//show the publishers
      filteredPublishers: null,//show the publishers from the search result
      publishersPerPage: [1, 10, 25, 50, 100],//show publishers per page
      rowsPerPage: 10,//default publishers (rows) per page on table
      thisPage: 1,//default page
      topics: ["Name", "Revenue Share Method", "Both", "Edit"],
      showModal: false,
      editPublisher: 0
    }
  }

  componentDidMount(event){
    get("/publishers").then((response) => {
      console.info("Loaded - Publishers");
      this.setState({publishers: this.getValidObjs(response.data)});
    }).catch((err) => {
      console.info("Final", err);
    })
  }

  //Filters the valid objects in the array, in this case, if revenue_share is in the object
  getValidObjs(obj){
      let sort = _.orderBy(obj, "_id");
      let i = 0;
      let partObj = [];

      for(i; i < sort.length; i++){
          if(sort[i].revenue_share !== undefined){
            partObj.push(sort[i]);
          }
      }
      return partObj;
  }

  updateObject(id, data){
    console.info("DATA : ", data);

    //update database
    post("/publishers/update/", {_id: id, revenue_share: {both: data}}).then((response) => {
      console.info("Publishers", response);
    }).catch((err) => {
      console.info("Final", err);
    })
  }

  //Update the rows based on the pagination component
  updateRows(rows){
    for(let i = 0; i < this.state.publishersPerPage.length; i++){
      if(this.state.publishersPerPage[i] == rows){
        this.setState({rowsPerPage: this.state.publishersPerPage[i]});
      }
    }
  }

  //Update the current page (index init) on the table from the pagination
  onSelectPage(evt){
    // this.setState({thisPage: evt});
     this.setState(prevState => {
        prevState.thisPage = evt;
        return prevState;
     });
  }

  openEditModal(data, id){
    console.log("openModal data : ", data.props.pub);
    let found = data.props.pub;
    this.setState(prevState => {
        prevState.editPublisher = found;
        prevState.showModal = true;
        return prevState;
     });
  }

  closeEditModal(data){
    this.setState(prevState => {
        prevState.showModal = false;
        return prevState;
     });
  }

  onSubmitSearch(result){
    this.setState({filteredPublishers: result});
  }

render() {
    return (
      <div>
        <h1>Publishers</h1>
        <Search
        list={this.state.publishers}
        onValueChange={(...args) => this.onSubmitSearch(...args)}
        />
        
        <CustomPagination
          showOptions={this.state.publishersPerPage}
          totalItems={this.state.publishers.length}
          onUpdateItems={(...args) => this.updateRows(...args)}
          onSelectPage={(...args) => this.onSelectPage(...args)} />

        <Table
          tableData={(this.state.filteredPublishers == null || _.isEmpty(this.state.filteredPublishers)) ? this.state.publishers : this.state.filteredPublishers}
          tableColumns={this.state.topics}
          rows={this.state.rowsPerPage}
          pageNumber={this.state.thisPage}
          onSelectRow={(...args) => this.openEditModal(...args)} />

        <EditModal 
          objID={this.state.editPublisher}
          saveModal={(...args) => this.updateObject(...args)}
          openModal={this.state.showModal}
          closeModal={(...args) => this.closeEditModal(...args)}
          />

      </div>
    );
  }
}

export default Publishers;
