import React from 'react'
import AddVehicle from '../../components/Admin/AddVehicle/AddVehicle';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';

const Add_Vehicle = () => {
  return (
    <div className=" flex">
      <AdminMenu/>
      <AddVehicle/>
    </div>
  );
}

export default Add_Vehicle