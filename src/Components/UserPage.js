import React, { useState, useEffect } from 'react';
import { useAuth } from '../Login/AuthContext ';
import { useSelector, useDispatch } from "react-redux";
import { setFinance, toggleChecked } from '../Redux/FinanceSlice';

const Userpage = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState({});
  const dispatch = useDispatch();
  const { finance } = useSelector((state) => state.financeList);
  console.log('finance ==>', finance)
  const [newFinance, setNewFinance] = useState([])
 
  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await fetch('/List/banking_services.json');
          if(!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          dispatch(setFinance(data));
      } catch (error) {
        console.error("Error fetching data:", error);
        dispatch(setFinance([])); // Handle error by setting an empty list
      }
    }

    fetchData()
  },[dispatch])

  const handleOpen = (key) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key] // Toggle open/close state
    }));
  };

  const handleToggleChecked = (id, name) => {
    // Dispatch the toggle action to update the Redux state
    dispatch(toggleChecked(id));
    console.log(id);
    console.log(name);
  
    // If the item is already in the `newFinance` list, remove it
    // Otherwise, add it to the list
    setNewFinance((prevState) => {
      if (prevState.includes(name)) {
        return prevState.filter(item => item !== name); // Remove item from the list
      } else {
        return [...prevState, name]; // Add item to the list
      }
    });
  };
 
  return(
    <div>
      {user ? (
        <div>
          <nav className='navbar navbar-expand-lg bg-body-tertiary'>
            <div className='container-fluid'>
              <h1>Welcome {user?.name}</h1>
              <div className='d-flex me-4'>
                <button className='btn btn-primary' onClick={logout}>logout</button>
              </div>
            </div>
          
          </nav>
          <div className='container-fluid mt-4'>
            <div className='row'>
              <div className='col-sm-6'>
              {finance && Object.entries(finance).length > 0 ? (
                Object.entries(finance).map(([key, category]) => {
                return (
      <div key={key}>
        <ul className="list-group mb-2 mt-2">
          <button
            className="list-group-item list-group-item-action active"
            aria-current="true"
            onClick={(e) => {
              e.preventDefault();
              handleOpen(key);
            }}
          >
            {category.title}
          </button>

          {isOpen[key] && (
            <React.Fragment>
              {category.items.map((item) => (
                <li key={item.id} className="list-group-item">
                  <input
                    type="checkbox"
                    className="me-2"
                    checked={item.checked} // Set checkbox based on the item's checked state
                    onChange={() => handleToggleChecked(item.id, item.name)} // Use item.id for uniqueness
                    aria-label={`Mark ${item.name} as completed`} // You can use item.name or any other identifier
                  />
                  {item.name} {/* Display item name */}
                </li>
              ))}
            </React.Fragment>
          )}
        </ul>
      </div>
    );
  })
) : null}
              </div>
              <div className='col-sm-6'>
              <p className='fw-bold'>My Financial Solutions & Innovations Portfolio</p>
              <ul className="list-group mt-2">
                {newFinance.map((item, index) => (
                  <li key={index} className="list-group-item">
                    {item}
                  </li>
                ))}
                 
                </ul>
            </div>
            </div>
            
            
          </div>
          
        </div>
      ) : (
        <div className='container-fluid'>
            <h1>Loading...</h1>
        </div>
        
      ) }
      
    </div>
  )
}

export default Userpage;