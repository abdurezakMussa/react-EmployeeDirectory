import React, { Component } from "react";
import API from "../components/utils/API";
import "../components/style.css";
import DataTable from "./SearchForm";
import SearchBox from "./SearchForm";

class Main extends Component {
  state = {
    searchs: "",
    employees: [],
    filteredEmployees: [],
    sort: "",
  };
  // this is the initialization, what do you want the page to display when page it's first loaded
  componentDidMount() {
    API.search()
      .then((res) =>
        this.setState({
          employees: res.data.results,
          filteredEmployees: res.data.results,
        })
      ).catch((err) => console.log(err));
  }
  //sort by "name" and shown by asc/desc order
  sortByName = () => {
    const filtereds = this.state.filteredEmployees;
    if (this.state.sort === "asc") {
      const ordereds = filtereds.sort((a, b) =>
        a.name.first > b.name.first ? 1 : -1
      );
      console.log(ordereds);
      this.setState({
        filteredEmployees: ordereds,
        sort: "dec",
      });
    } else {
      const ordereds = filtereds.sort((a, b) =>
        a.name.first > b.name.first ? -1 : 1
      );
      console.log("ordered");
      this.setState({
        filteredEmployees: ordereds,
        sort: "asc",
      });
    }
  };
//when input is changing it will dynamically show the associates names that match in the screen
handleInputChange=event=>{
    const employees=this.state.employees;
    const UserInput=this.state.target.value;
    const filteredEmployees=employees.filter(employees=>employees.name.first.toLowerCase().indexof(UserInput.toLowerCase())>-1)
    this.setState({
         //change the state of  filteredEmployes now it holds all the employes that matches users
        // search and will be passed down in this state
        filteredEmployees,
    })

};
 //API call triggered when page it's refreshed and  when application it's loaded 
 EmployeeSearch=()=>{
     API.search()
     .then(res=>this.setState({

       //change their both states to hold all the data from the API call(all employess) and will be passed down trough props like that
      //employee will remain the same and filteredEmployes will be changed and passed down during application's life. Employee will always hold all employess.  
      filteredEmployees:res.data.results,
      employees:res.data.results
     }))
     .catch(err=>console.log(err));
    }
       //when button search clicked
    handlesearch=event=>{
        event.preventDefault();
        if(!this.state.searchs){
        alert("Enter a name")
        }
        const{employees,searchs}=this.state;
         //filters an object looking for the value that matches the value entered in the input box by the user  (search.this.state)
         const filteredEmployees=employees.filter(employees=>employees.name.first.toLowerCase()).includes(searchs.toLowerCase());
         this.setState({  filteredEmployees });
      }
         render(){
           
             return(
                 <div>
                     <SearchBox
                     employees={this.state.employees}
                     handlesearch={this.handlesearch}
                     handleInputChange={this.handleInputChange}/>
                    <DataTable results={this.state.filteredEmployees}
                    sortByName={this.sortByName}
                    />
                 </div>
               )
             
             }
    }

export default Main