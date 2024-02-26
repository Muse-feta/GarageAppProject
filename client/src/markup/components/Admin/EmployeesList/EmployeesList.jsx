import React,{useState, useEffect} from 'react'
import { useAuth } from '../../../../context/AuthContext';
import {format} from 'date-fns'
import employeeService from '../../../../services/employee.service';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const EmployeesList = () => {
  let employeeToken = "";
    const [employees, setEmployees] = useState([]);
    
      const { employee } = useAuth();
      console.log(employee)
      if (employee && employee.token) {
        employeeToken = employee.token;
      }
      console.log(employeeToken)
useEffect( () => {
  const res = employeeService.getAllEmployees(employeeToken);
  res.then((res) => {
    setEmployees(res.data.data);
  })
},[ employeeToken])
console.log(employees);
  return (
    <div>
      {!employees ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className=" flex m-7">
            <h1 className=" font-extrabold text-3xl">Employees</h1>
            <h1 className=" w-11 mt-[-10px] border-b-2 border-red-500"></h1>
          </div>
          <div class="flex flex-col w-full overflow-x-auto">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full">
                    <thead class="bg-white border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Active
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          First Name
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Last Name
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Added Date
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Edit/Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="overflow-x-auto">
                      {employees.map((employee) => (
                        <tr class="bg-gray-100 border-b">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {employee.active_employee === 1 ? "Yes" : "No"}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {employee.employee_first_name}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {employee.employee_last_name}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {employee.employee_email}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {employee.employee_phone}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {format(
                              new Date(employee.added_date),
                              "MM/dd/yyyy"
                            )}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {employee.company_role_name}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              <button>
                                <FaEdit />
                              </button>
                              <button>
                                <MdDelete />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {/* <tr class="bg-white border-b">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    2
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    Jacob
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    Thornton
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    @fat
                  </td>
                </tr> */}
                      {/* <tr class="bg-gray-100 border-b">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    3
                  </td>
                  <td
                    colspan="2"
                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                  >
                    Larry the Bird
                  </td>
                  <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    @twitter
                  </td>
                </tr> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EmployeesList